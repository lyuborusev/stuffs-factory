import express, { Router } from "express";
import { controllerErrorHandler } from "../../middleware/error.handler";
import { AppDataSource } from "../../database/datasource";
import { Group } from "../group/group.model";
import { Component } from "../component/component.model";
import { In, IsNull } from "typeorm";
import { Specification } from "../specification/specification.model";

export default class ComponentValidator {
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
            const component = await AppDataSource.getRepository(Component).findOne({
                where: {
                    id: req.params.id,
                },
                relations: {
                    group: {
                        specification: true
                    }
                }
            });

            if (!component) {
                res.status(404).send({ errors: [{ message: `Component ${req.params.id} could not be resolved!` }] });
                return;
            }

            if (component.group?.specification?.completed == true) {
                res.status(400).send({ errors: [{ message: `Component ${req.params.id} is part of a 'completed' Specification and cannot be modified!` }] });
                return;
            }

            next();

        } catch (e: any) {
            res.status(400).send({ errors: [{ message: e.message }] });
        }
    }
};