import express from "express";
import { ValidatorSchemas } from "../interfaces/validator";
import joi from 'joi';

export default function JoiValidator(schemeCRUD: ValidatorSchemas) {
    return async function (req: express.Request, res: express.Response, next: express.NextFunction) {
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
            req.body = validated;
            next();

        } catch (e: any) {
            console.log(e.message);
            res.status(500).send(e.message);
        }
    }
}