import express, { Router } from "express";
import { DataRepository } from "../database/repository";
import { ObjectLiteral } from "typeorm";

export default class RelationResolver<EntityType extends ObjectLiteral> {
    private entityType: new () => EntityType;

    relationId: string;
    relationName: string;

    constructor(relationId: string, relationName: string, entityType: new () => EntityType) {
        this.relationId = relationId;
        this.relationName = relationName;

        this.entityType = entityType;

        this.intializeRoutes();
    }

    router: Router = Router();

    getRouter(): Router {
        return this.router;
    }

    intializeRoutes() {
        this.router.post('/', this.ResolveFunction);
    }

    ResolveFunction = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            const repo = new DataRepository<EntityType>(this.entityType);
            const relation = await repo.getById(req.body[this.relationId]);
            if (!relation) {
                res.status(400).send(`Relation ${this.relationId} could not be resolved!`);
                return;
            }

            req.body[this.relationName] = relation;
            next();

        } catch (e: any) {
            console.log(e.message);
            res.status(400).send(e.message);
        }
    }
}