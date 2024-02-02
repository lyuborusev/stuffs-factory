import { Router } from 'express';
import ControllerInterface from './controller'

export default interface RouterInterface {
    router: Router;
    controller: ControllerInterface;
    intializeRoutes(): void;
    getRouter(): Router;
};