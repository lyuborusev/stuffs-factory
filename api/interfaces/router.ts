import { RequestHandler, Router } from 'express';
import ControllerCRUD from './controller'
import { controllerErrorHandler } from '../middleware/error.handler';

export default interface RouterInterface {
    router: Router;
    controller: ControllerCRUD;
    intializeRoutes(): void;
    getRouter(): Router;
};

export default class RouterCRUD implements RouterInterface {
    router: Router = Router();
    controller: ControllerCRUD;
    validator: RequestHandler;

    constructor(validator: RequestHandler, controller: ControllerCRUD) {
        this.controller = controller;
        this.validator = validator;

        this.intializeRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    intializeRoutes() {
        this.router.use('/:id?', this.validator);

        this.router.post('/', controllerErrorHandler(this.controller.post));

        this.router.get('/', controllerErrorHandler(this.controller.getAll));
        this.router.get('/:id', controllerErrorHandler(this.controller.get));

        this.router.put('/:id', controllerErrorHandler(this.controller.put));
        this.router.patch('/:id', controllerErrorHandler(this.controller.patch));

        this.router.delete('/:id', controllerErrorHandler(this.controller.delete));
    }
};