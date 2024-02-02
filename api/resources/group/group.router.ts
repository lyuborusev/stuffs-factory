import GroupSchemes from './group.scheme';
import JoiValidator from '../../middleware/joi.validator';
import RelationResolver from '../../middleware/relation.resolver';
import { Specification } from '../specification/specification.model';
import RouterCRUD from '../../framework/framework.router';
import ControllerCRUD from '../../framework/framework.controller';
import { Group } from './group.model';
import GroupValidator from './group.validator';

export default [
    new JoiValidator(new GroupSchemes()).getRouter(),
    new GroupValidator().getRouter(),
    new RelationResolver<Specification>('specificationId', 'specification', Specification).getRouter(),
    new RouterCRUD(new ControllerCRUD(Group)).getRouter()
];