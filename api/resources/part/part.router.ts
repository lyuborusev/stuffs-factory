import PartController from './part.controller'
import RouterCRUD from '../../interfaces/router'

export default new RouterCRUD(new PartController).getRouter();