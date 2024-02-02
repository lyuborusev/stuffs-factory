import joi from 'joi'
import ValidatorCRUD from '../../framework/framework.validator'

export default class SpecificationSchemes extends ValidatorCRUD {
    constructor() {
        super(
            joi.object({
                name: joi.string().required(),
                codeNumber: joi.string().required(),
            }),
            joi.object({
                name: joi.string().optional(),
                codeNumber: joi.string().optional(),
                completed: joi.boolean().optional()
            })
        )
    }
};