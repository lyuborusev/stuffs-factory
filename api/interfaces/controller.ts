import { NextFunction, Request, Response } from 'express';

export default interface ControllerCRUD {
    //Create
    post(req: Request, res: Response, next: NextFunction): void;

    //Read
    get(req: Request, res: Response): void;
    getAll(req: Request, res: Response): void;

    //Update
    put(req: Request, res: Response): void;
    patch(req: Request, res: Response): void;

    //Delete
    delete(req: Request, res: Response): void;
}
