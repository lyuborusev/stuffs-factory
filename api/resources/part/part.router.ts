import JoiValidator from '../../middleware/joi.validator';
import PartSchemes from './part.scheme';
import RouterCRUD from '../../framework/framework.router';

export default [
    new JoiValidator(new PartSchemes()).getRouter(),
    //new RouterCRUD(new PartController).getRouter()
];