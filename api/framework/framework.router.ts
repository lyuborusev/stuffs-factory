import { Router } from "express";
import RouterInterface from "../interfaces/router";
import ControllerInterface from "../interfaces/controller";
import { controllerErrorHandler } from "../middleware/error.handler";

export default class RouterCRUD implements RouterInterface {
    router: Router = Router();
    controller: ControllerInterface;

    constructor(controller: ControllerInterface) {
        this.controller = controller;

        this.intializeRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    intializeRoutes() {
        this.router.post('/', controllerErrorHandler(this.controller.post));

        this.router.get('/', controllerErrorHandler(this.controller.getAll));
        this.router.get('/:id', controllerErrorHandler(this.controller.get));

        this.router.put('/:id', controllerErrorHandler(this.controller.put));
        this.router.patch('/:id', controllerErrorHandler(this.controller.patch));

        this.router.delete('/:id', controllerErrorHandler(this.controller.delete));
    }
};