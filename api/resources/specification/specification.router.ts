import JoiValidator from '../../middleware/joi.validator';
import SpecificationSchemes from './specification.scheme';
import { Specification } from './specification.model';
import RouterCRUD from "../../framework/framework.router";
import ControllerCRUD from "../../framework/framework.controller";
import SpecificationValidator from './specification.validator';

export default [
    new JoiValidator(new SpecificationSchemes).getRouter(),
    new SpecificationValidator().getRouter(),
    new RouterCRUD(new ControllerCRUD(Specification)).getRouter()
];