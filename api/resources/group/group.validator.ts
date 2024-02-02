import express, { Router } from "express";
import { controllerErrorHandler } from "../../middleware/error.handler";
import { AppDataSource } from "../../database/datasource";
import { Group } from "../group/group.model";

export default class GroupValidator {
    router: Router = Router();

    constructor() {
        this.intializeRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    intializeRoutes() {
        this.router.put('/:id', controllerErrorHandler(this.ValidationFunction));
        this.router.patch('/:id', controllerErrorHandler(this.ValidationFunction));
    }

    async ValidationFunction(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const group = await AppDataSource.getRepository(Group).findOne({
                where: {
                    id: req.params.id,
                },
                relations: {
                    specification: true
                }
            });


            if (!group) {
                res.status(404).send({ errors: [{ message: `Group ${req.params.id} could not be resolved!` }] });
                return;
            }

            if (group.specification?.completed == true) {
                res.status(400).send({ errors: [{ message: `Group ${req.params.id} is part of a 'completed' Specification and cannot be modified!` }] });
                return;
            }

            next();

        } catch (e: any) {
            res.status(400).send({ errors: [{ message: e.message }] });
        }
    }
};