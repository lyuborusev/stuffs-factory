import SpecificationController from './specification.controller'
import RouterCRUD from '../../interfaces/router'
import JoiValidator from '../../middleware/joi.validator';
import SpecificationSchemes from './specification.scheme';

export default new RouterCRUD(
    JoiValidator(new SpecificationSchemes()),
    new SpecificationController
).getRouter();