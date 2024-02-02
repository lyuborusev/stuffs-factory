import JoiValidator from '../../middleware/joi.validator';
import SpecificationSchemes from './specification.scheme';
import { Specification } from './specification.model';
import RouterCRUD from "../../framework/framework.router";
import ControllerCRUD from "../../framework/framework.controller";

export default [
    new JoiValidator(new SpecificationSchemes).getRouter(),
    new RouterCRUD(new ControllerCRUD(Specification)).getRouter()
];