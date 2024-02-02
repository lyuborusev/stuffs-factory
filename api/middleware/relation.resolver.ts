import express, { Router } from "express";
import { DataRepository } from "../database/repository";
import { ObjectLiteral } from "typeorm";
import { controllerErrorHandler } from "./error.handler";

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
        this.router.post('/', controllerErrorHandler(this.ResolveFunction));

        this.router.get('/', controllerErrorHandler(this.ResolveFunction));
        this.router.get('/:id', controllerErrorHandler(this.ResolveFunction));

        this.router.put('/:id', controllerErrorHandler(this.ResolveFunction));
        this.router.patch('/:id', controllerErrorHandler(this.ResolveFunction));

        this.router.delete('/:id', controllerErrorHandler(this.ResolveFunction));
    }

    ResolveFunction = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            if (req.body[this.relationId]) {
                const repo = new DataRepository<EntityType>(this.entityType);
                const relation = await repo.getById(req.body[this.relationId]);
                if (!relation) {
                    res.status(400).send(`Relation ${this.relationId} could not be resolved!`);
                    return;
                }

                delete req.body[this.relationId];
                req.body[this.relationName] = relation;
            }
            next();

        } catch (e: any) {
            res.status(400).send(e.message);
        }
    }
}