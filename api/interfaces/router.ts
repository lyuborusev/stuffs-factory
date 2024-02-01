import { RequestHandler, Router } from 'express';
import ControllerCRUD from './controller'

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

        this.router.post('/', this.controller.post);

        this.router.get('/', this.controller.getAll);
        this.router.get('/:id', this.controller.get);

        this.router.put('/:id', this.controller.put);
        this.router.patch('/:id', this.controller.patch);

        this.router.delete('/:id', this.controller.delete);
    }
};