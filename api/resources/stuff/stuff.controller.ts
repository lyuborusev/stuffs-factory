import { Request, Response } from 'express';
import ControllerCRUD from "../../interfaces/controller";

export default class StuffController implements ControllerCRUD {
    post(req: Request, res: Response): void {
        console.log('post');
        res.status(200).json({});
    }
    get(req: Request, res: Response): void {

        console.log('get');
        res.status(200).json({});
    }
    getAll(req: Request, res: Response): void {

        console.log('getAll');
        res.status(200).json({});
    }

    put(req: Request, res: Response): void {
        console.log('put');
        res.status(200).json({});

    }
    patch(req: Request, res: Response): void {
        console.log('patch');
        res.status(200).json({});

    }
    delete(req: Request, res: Response): void {
        console.log('delete');
        res.status(200).json({});

    }
}