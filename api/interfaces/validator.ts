import joi from 'joi';

interface ValidatorSchemas {
    bodyPost: joi.ObjectSchema<any>;
    bodyPatch: joi.ObjectSchema<any>;

    post(): joi.ObjectSchema<any>;

    get(): joi.ObjectSchema<any>;
    getAll(): joi.ObjectSchema<any>;

    put(): joi.ObjectSchema<any>;
    patch(): joi.ObjectSchema<any>;

    delete(): joi.ObjectSchema<any>;
}

class ValidatorCRUD implements ValidatorSchemas {
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
        return joi.object({}).unknown(true);
    }

    delete(): joi.ObjectSchema<any> {
        return joi.object({
            params: joi.object({
                id: joi.string().guid({ version: 'uuidv4' }).required(),
            }),
        }).unknown(true);
    }
}

export {
    ValidatorSchemas,
    ValidatorCRUD
}