import { NextFunction, Request, RequestHandler, Response } from "express";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    console.error(err);
    res.status(500).send({ errors: [{ message: "Something went wrong in Stuffs Factory!" }] });
};

export function controllerErrorHandler(handler: RequestHandler): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}