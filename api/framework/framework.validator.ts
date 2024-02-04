import ValidatorSchemas from "../interfaces/validator";
import joi from 'joi';

export default class ValidatorCRUD implements ValidatorSchemas {
    bodyPost: joi.ObjectSchema<any>;
    bodyPatch: joi.ObjectSchema<any>;


    constructor(bodyPost: joi.ObjectSchema<any>, bodyPatch: joi.ObjectSchema<any>) {
        this.bodyPost = bodyPost;
        this.bodyPatch = bodyPatch;
    }

    post(): joi.ObjectSchema<any> {
        return joi.object({
            body: this.bodyPost.required()
        }).unknown(true);
    }

    put(): joi.ObjectSchema<any> {
        return joi.object({
            params: joi.object({
                id: joi.string().guid({ version: 'uuidv4' }).required(),
            }),
            body: this.bodyPost.required()
        }).unknown(true);

    }

    patch(): joi.ObjectSchema<any> {
        return joi.object({
            params: joi.object({
                id: joi.string().guid({ version: 'uuidv4' }).required(),
            }),
            body: this.bodyPatch.required()
        }).unknown(true);
    }

    get(): joi.ObjectSchema<any> {
        return joi.object({
            params: joi.object({
                id: joi.string().guid({ version: 'uuidv4' }).required(),
            }),
        }).unknown(true);
    }

    getAll(): joi.ObjectSchema<any> {
        return joi.object({
            query: joi.object({
                take: joi.number().raw().optional(),
                skip: joi.number().raw().optional(),
            })
        }).unknown(true);
    }

    delete(): joi.ObjectSchema<any> {
        return joi.object({
            params: joi.object({
                id: joi.string().guid({ version: 'uuidv4' }).required(),
            }),
        }).unknown(true);
    }
}