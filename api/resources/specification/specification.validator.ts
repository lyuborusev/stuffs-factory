import express, { Router } from "express";
import { controllerErrorHandler } from "../../middleware/error.handler";
import { AppDataSource } from "../../database/datasource";
import { Specification } from "./specification.model";
import { Group } from "../group/group.model";
import { Component } from "../component/component.model";
import { In, IsNull } from "typeorm";

export default class SpecificationValidator {
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
            const specification = await AppDataSource.getRepository(Specification).findOne({
                where: {
                    id: req.params.id
                },
            });

            if (!specification) {
                res.status(404).send({ errors: [{ message: `Specification ${req.params.id} could not be resolved!` }] });
                return;
            }

            if (specification.completed == true) {
                res.status(400).send({ errors: [{ message: `Specification ${req.params.id} is 'completed' and cannot be modified!` }] });
                return;
            }

            if (req.body.completed) {

                const groups = await AppDataSource.getRepository(Group).find({
                    where: {
                        specification: {
                            id: specification?.id,
                        }
                    }
                })

                if (groups.length == 0) {
                    res.status(400).send({ errors: [{ message: `Specification ${req.params.id} could not be 'completed' without defining 'groups', 'components' and their 'parts'` }] });
                    return;
                }

                const groupIds: (string | undefined)[] = groups.flatMap((g) => {
                    return g.id;
                });

                const components = await AppDataSource.getRepository(Component).find({
                    where: {
                        group: {
                            id: In(groupIds)
                        }
                    }
                })
                if (components.length == 0) {
                    res.status(400).send({ errors: [{ message: `Specification ${req.params.id} could not be 'completed' without defining 'components' and their 'parts'` }] });
                    return;
                }

                const componentsWithoutParts = await AppDataSource.getRepository(Component).find({
                    where: {
                        group: {
                            id: In(groupIds)
                        },
                        part: IsNull()
                    }
                })

                if (componentsWithoutParts.length > 0) {
                    const conponentIds: (string | undefined)[] = componentsWithoutParts.flatMap((c) => {
                        return c.id;
                    });
                    res.status(400).send({ errors: [{ message: `Specification ${req.params.id} could not be 'completed' because the following components do not have parts set! ${conponentIds}` }] });
                    return;
                }
            }

            next();

        } catch (e: any) {
            res.status(400).send({ errors: [{ message: e.message }] });
        }
    }
};