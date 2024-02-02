import { Request, Response, NextFunction } from "express";
import { DataRepository } from "../database/repository";
import { ObjectLiteral } from "typeorm";

export default class ControllerCRUD<EntityType extends ObjectLiteral> {
    private entityType: new () => EntityType;

    constructor(entityType: new () => EntityType) {
        this.entityType = entityType;
    }
    post = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        const specRepo = new DataRepository<EntityType>(this.entityType);
        const data = await specRepo.save(req.body);
        res.status(200).json(data);

    }

    put = async (req: Request, res: Response): Promise<void> => {
        const specRepo = new DataRepository<EntityType>(this.entityType);
        const data = await specRepo.update(
            req.params.id,
            req.body
        );

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send();
        }
    }

    patch = async (req: Request, res: Response): Promise<void> => {
        const specRepo = new DataRepository<EntityType>(this.entityType);
        const data = await specRepo.update(
            req.params.id,
            req.body
        );

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send();
        }
    }

    get = async (req: Request, res: Response): Promise<void> => {
        const specRepo = new DataRepository<EntityType>(this.entityType);
        const data = await specRepo.getById(req.params.id);

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send();
        }
    }

    getAll = async (req: Request, res: Response): Promise<void> => {
        const specRepo = new DataRepository<EntityType>(this.entityType);
        const data = await specRepo.getAll();

        res.status(200).json({
            data: data
        });
    }

    delete = async (req: Request, res: Response): Promise<void> => {
        const specRepo = new DataRepository<EntityType>(this.entityType);
        const data = await specRepo.delete(req.params.id);
        if (data) {
            res.status(202).json(data);
        } else {
            res.status(404).send();
        }
    }
}
