import ComponentSchemes from './component.scheme';
import JoiValidator from '../../middleware/joi.validator';
import RouterCRUD from '../../framework/framework.router';
import { Component } from './component.model';
import ControllerCRUD from '../../framework/framework.controller';
import RelationResolver from '../../middleware/relation.resolver';
import { Group } from '../group/group.model';

export default [
    new JoiValidator(new ComponentSchemes()).getRouter(),
    new RelationResolver<Group>('groupId', 'group', Group).getRouter(),
    new RouterCRUD(new ControllerCRUD(Component)).getRouter()
];