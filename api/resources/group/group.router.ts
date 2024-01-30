import GroupController from './group.controller'
import RouterCRUD from '../../interfaces/router'

export default new RouterCRUD(new GroupController).getRouter();