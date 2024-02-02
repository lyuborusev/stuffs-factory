import joi from 'joi'
import ValidatorCRUD from '../../framework/framework.validator'

export default class ComponentSchemes extends ValidatorCRUD {
    constructor() {
        super(
            joi.object({
                groupId: joi.string().uuid().required(),
                name: joi.string().required(),
                description: joi.string().required(),
                partCode: joi.string().required(),
                groupCode: joi.string().required()
            }),
            joi.object({
                partId: joi.string().uuid().optional(),
                name: joi.string().optional(),
                description: joi.string().optional(),
                partCode: joi.string().optional(),
                groupCode: joi.string().optional()
            })
        )
    }
};