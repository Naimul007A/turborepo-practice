import { prismaClient } from "prisma-types";
import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
import { validateForm } from "@utils/validation";
import { z } from "zod";
async function userIndex(req: Request, res: Response, next: NextFunction) {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
        const page = req.query.page ? parseInt(req.query.page as string) : 1;
        const offset = (page - 1) * limit;
        const users = await prismaClient.user.findMany({
            skip: offset,
            take: limit,
            select: {
                id: true,
                name: true,
                username: true,
                email: true,
                createdAt: true,
            }
        });
        res.status(200).json({
            success: {
                message: "Users fetched successfully.",
                data: users,
            },
        });
    } catch (error) {
        next(error);
    }

}

async function userStore(req: Request, res: Response, next: NextFunction) {
    try {
        const schema = z.object({
            name: z.string(),
            username: z.string(),
            email: z.string().email(),
            password: z.string().min(6),
        });
        const { success, data, error } = schema.safeParse(req.body);
        if (!success) {
            throw createError(422, error);
        }
        const user = await prismaClient.user.create({
            data: {
                name: data.name,
                username: data.username,
                email: data.email,
                password: data.password,
            },
        });
        res.status(201).json({
            success: {
                message: "User created successfully.",
                data: user,
            },
        });
    } catch (error) {
        next(error);
    }
}
