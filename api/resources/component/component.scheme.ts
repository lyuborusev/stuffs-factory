import joi from 'joi'
import { ValidatorCRUD } from '../../interfaces/validator';

export default class ComponentSchemes extends ValidatorCRUD {
    constructor() {
        super(
            joi.object({
                name: joi.string().required(),
                description: joi.string().required(),
                partCode: joi.string().required(),
                groupCode: joi.string().required()
            }),
            joi.object({
                name: joi.string().optional(),
                description: joi.string().optional(),
                partCode: joi.string().optional(),
                groupCode: joi.string().optional()
            })
        )
    }
};