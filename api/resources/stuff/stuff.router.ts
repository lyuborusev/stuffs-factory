import StuffController from './stuff.controller'
import RouterCRUD from '../../interfaces/router'

export default new RouterCRUD(new StuffController).getRouter();