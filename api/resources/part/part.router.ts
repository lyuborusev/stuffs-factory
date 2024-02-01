import PartController from './part.controller'
import RouterCRUD from '../../interfaces/router'
import JoiValidator from '../../middleware/joi.validator';
import PartSchemes from './part.scheme';

export default new RouterCRUD(
    JoiValidator(new PartSchemes),
    new PartController
).getRouter();