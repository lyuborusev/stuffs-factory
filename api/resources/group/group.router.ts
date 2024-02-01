import GroupController from './group.controller'
import RouterCRUD from '../../interfaces/router'
import GroupSchemes from './group.scheme';
import JoiValidator from '../../middleware/joi.validator';

export default new RouterCRUD(
    JoiValidator(new GroupSchemes),
    new GroupController
).getRouter();