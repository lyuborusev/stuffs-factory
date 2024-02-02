import express, { Router } from "express";
import ValidatorSchemas from "../interfaces/validator";
import { controllerErrorHandler } from "./error.handler";
import joi from 'joi';

export default class JoiValidator {
    router: Router = Router();
    schemeCRUD: ValidatorSchemas;

    constructor(schemeCRUD: ValidatorSchemas) {
        this.schemeCRUD = schemeCRUD;
        this.intializeRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    intializeRoutes() {
        this.router.use('/:id?', controllerErrorHandler(this.ValidationFunction(this.schemeCRUD)));
    }

    ValidationFunction(schemeCRUD: ValidatorSchemas) {
        return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            try {
                let scheme: joi.ObjectSchema<any> | undefined = undefined;
                const method = req.method.toLowerCase();
                switch (method) {
                    case 'post': {
                        scheme = schemeCRUD.post();
                        break;
                    }
                    case 'get': {
                        if (req.params.id) {
                            scheme = schemeCRUD.get();
                        } else {
                            scheme = schemeCRUD.getAll();
                        }
                        break;
                    }
                    case 'put': {
                        scheme = schemeCRUD.put();
                        break;
                    }
                    case 'patch': {
                        scheme = schemeCRUD.patch();
                        break;
                    }
                    case 'delete': {
                        scheme = schemeCRUD.delete();
                        break;
                    }
                };
                const validated = await scheme?.validateAsync(req, {
                    abortEarly: false
                });
                next();

            } catch (e: any) {
                console.log(e.message);
                res.status(400).send(e.message);
            }
        }
    }
};