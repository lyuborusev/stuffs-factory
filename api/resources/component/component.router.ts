import ComponentController from './component.controller'
import RouterCRUD from '../../interfaces/router'

export default new RouterCRUD(new ComponentController).getRouter();