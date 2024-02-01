import joi from 'joi'
import { ValidatorCRUD } from '../../interfaces/validator';


export default class PartSchemes extends ValidatorCRUD {

    constructor() {
        super(
            joi.object({
                name: joi.string().required(),
            }), joi.object({
                name: joi.string().optional(),
            })
        )
    }
};