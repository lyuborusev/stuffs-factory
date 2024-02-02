import joi from 'joi';

export default interface ValidatorSchemas {
    bodyPost: joi.ObjectSchema<any>;
    bodyPatch: joi.ObjectSchema<any>;

    post(): joi.ObjectSchema<any>;

    get(): joi.ObjectSchema<any>;
    getAll(): joi.ObjectSchema<any>;

    put(): joi.ObjectSchema<any>;
    patch(): joi.ObjectSchema<any>;

    delete(): joi.ObjectSchema<any>;
}