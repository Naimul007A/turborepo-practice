
import { Prisma, PrismaClient } from '@prisma/client'

export const prismaClient = new PrismaClient()

export type User = Prisma.PromiseReturnType<typeof prismaClient.user.findUnique>

export type Post = Prisma.PromiseReturnType<typeof prismaClient.post.findUnique>
