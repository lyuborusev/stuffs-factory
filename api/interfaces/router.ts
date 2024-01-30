import { Router } from "express";
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

    constructor(controller: ControllerCRUD) {
        this.controller = controller;

        this.intializeRoutes();
    }

    getRouter(): Router {
        return this.router;
    }

    intializeRoutes() {
        // Create a new Tutorial
        this.router.post("/", this.controller.post);

        // Retrieve all Tutorials
        this.router.get("/", this.controller.getAll);

        // Retrieve a single Tutorial with id
        this.router.get("/:id", this.controller.get);

        // Update a Tutorial with id
        this.router.put("/:id", this.controller.put);

        // Delete a Tutorial with id
        this.router.delete("/:id", this.controller.delete);
    }
};