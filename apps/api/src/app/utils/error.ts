import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { ZodError } from "zod";

//Throw error properly
async function errorHandler(
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    //@ts-ignore
    if (err.isJoi === true) {
        //@ts-ignore
        err.status = 422;
    }
    let messages: any = err.message;
    if (err instanceof ZodError) {
        const formattedErrors = err.issues.reduce((errors: { [key: string]: string }, issue) => {
            errors[issue.path[0] as string] = issue.message;
            return errors;
        }, {});
        //@ts-ignore
        err.status = 422;
        messages = formattedErrors;
    }
    //@ts-ignore
    err.status = err.status || 500;
    res.send({
        error: {
            //@ts-ignore
            status: err.status || 500,
            message: err.message,
        },
    });
}
//Route Not found
async function notFound(req: Request, res: Response, next: NextFunction) {
    next(createHttpError.NotFound("This Route not Registered."));
}

export { errorHandler, notFound };
