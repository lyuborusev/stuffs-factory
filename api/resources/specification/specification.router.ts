import SpecificationController from './specification.controller'
import RouterCRUD from '../../interfaces/router'

export default new RouterCRUD(new SpecificationController).getRouter();