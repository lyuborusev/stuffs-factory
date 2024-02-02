import ComponentSchemes from './component.scheme';
import JoiValidator from '../../middleware/joi.validator';
import RouterCRUD from '../../framework/framework.router';
import { Component } from './component.model';
import ControllerCRUD from '../../framework/framework.controller';
import RelationResolver from '../../middleware/relation.resolver';
import { Group } from '../group/group.model';
import { Part } from '../part/part.model';
import ComponentValidator from './component.validator';

export default [
    new JoiValidator(new ComponentSchemes()).getRouter(),
    new ComponentValidator().getRouter(),
    new RelationResolver<Group>('groupId', 'group', Group).getRouter(),
    new RelationResolver<Part>('partId', 'part', Part).getRouter(),
    new RouterCRUD(new ControllerCRUD(Component)).getRouter()
];