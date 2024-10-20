import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
async function apiHealth(req: Request, res: Response, next: NextFunction) {
    try {
        res.status(200).json({
            success: {
                message: "I am healthy.",
                data: "null",
            },
        });
    } catch (error) {
        next(error);
    }
}

export { apiHealth };
