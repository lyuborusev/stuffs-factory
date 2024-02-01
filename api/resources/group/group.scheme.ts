import joi from 'joi'
import { ValidatorCRUD } from '../../interfaces/validator';

export default class GroupSchemes extends ValidatorCRUD {
    constructor() {
        super(
            joi.object({
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