import ComponentController from './component.controller'
import RouterCRUD from '../../interfaces/router'
import ComponentSchemes from './component.scheme';
import JoiValidator from '../../middleware/joi.validator';

export default new RouterCRUD(
    JoiValidator(new ComponentSchemes),
    new ComponentController
).getRouter();