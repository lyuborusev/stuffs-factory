import joi from 'joi'
import ValidatorCRUD from '../../framework/framework.validator'

export default class SpecificationSchemes extends ValidatorCRUD {
    constructor() {
        super(
            joi.object({
                name: joi.string().required(),
                codeNumber: joi.string().required(),

                //created: joi.date(),
                //completed: joi.boolean()
            }),
            joi.object({
                name: joi.string().optional(),
                codeNumber: joi.string().optional(),

                //created: joi.date(),
                //completed: joi.boolean()
            })
        )
    }
};