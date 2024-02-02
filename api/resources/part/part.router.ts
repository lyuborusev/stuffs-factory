import JoiValidator from '../../middleware/joi.validator';
import PartSchemes from './part.scheme';
import RouterCRUD from '../../framework/framework.router';
import ControllerCRUD from '../../framework/framework.controller';
import RelationResolver from '../../middleware/relation.resolver';
import { Part } from './part.model';
import { Component } from '../component/component.model';

export default [
    new JoiValidator(new PartSchemes()).getRouter(),
    new RelationResolver<Component>('componentId', 'components', Component).getRouter(),
    new RouterCRUD(new ControllerCRUD(Part)).getRouter()
];