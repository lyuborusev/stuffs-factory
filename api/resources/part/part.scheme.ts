import joi from 'joi'
import ValidatorCRUD from '../../framework/framework.validator'


export default class PartSchemes extends ValidatorCRUD {
    constructor() {
        super(
            joi.object({
                componentId: joi.string().uuid().optional(),
                name: joi.string().required(),
            }),
            joi.object({
                componentId: joi.string().uuid().optional(),
                name: joi.string().optional(),
            })
        )
    }
};