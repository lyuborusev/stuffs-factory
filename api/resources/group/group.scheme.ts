import joi from 'joi'
import ValidatorCRUD from '../../framework/framework.validator'

export default class GroupSchemes extends ValidatorCRUD {
    constructor() {
        super(
            joi.object({
                specificationId: joi.string().uuid().required(),
                name: joi.string().required(),
                groupCode: joi.string().required()
            }),
            joi.object({
                name: joi.string().optional(),
                groupCode: joi.string().optional()
            })
        )
    }
};