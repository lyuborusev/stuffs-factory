import { NextFunction, Request, Response } from 'express';
import ControllerCRUD from "../../interfaces/controller";
import { AppDataSource } from '../../database/datasource';
import { Specification } from './specification.model';

export default class SpecificationController implements ControllerCRUD {
    async post(req: Request, res: Response, next: NextFunction): Promise<void> {

        const specRepo = AppDataSource.getRepository(Specification);
        const spec = specRepo.create(req.body.body);
        const data = await specRepo.save(spec);

        res.status(200).json(data);
    }

    async put(req: Request, res: Response): Promise<void> {
        const specRepo = AppDataSource.getRepository(Specification);
        const result = await specRepo.update(
            req.params.id,
            req.body.body
        );

        if (result && result.affected && result.affected > 0) {
            const data = await specRepo.findOneBy({
                id: req.params.id
            });

            if (data) {
                res.status(200).json(data);
            } else {
                throw new Error('Error: PUT request failed');
            }
        } else {
            res.status(404).send();
        }
    }

    async patch(req: Request, res: Response): Promise<void> {
        const specRepo = AppDataSource.getRepository(Specification);
        const result = await specRepo.update(
            req.params.id,
            req.body.body
        );

        if (result && result.affected && result.affected > 0) {
            const data = await specRepo.findOneBy({
                id: req.params.id
            });

            if (data) {
                res.status(200).json(data);
            } else {
                throw new Error('Error: PATCH request failed');
            }
        } else {
            res.status(404).send();
        }
    }

    async get(req: Request, res: Response): Promise<void> {
        const specRepo = AppDataSource.getRepository(Specification);
        const data = await specRepo.findOneBy({
            id: req.params.id
        });

        if (data) {
            res.status(200).json(data);
        } else {
            res.status(404).send();
        }
    }

    async getAll(req: Request, res: Response): Promise<void> {

        const specRepo = AppDataSource.getRepository(Specification);
        const data = await specRepo.find();

        res.status(200).json({
            data: data
        });
    }

    async delete(req: Request, res: Response): Promise<void> {

        const specRepo = AppDataSource.getRepository(Specification);
        const result = await specRepo.softDelete({
            id: req.params.id
        });


        if (result && result.affected && result.affected > 0) {
            const data = await specRepo.find({
                where: { id: req.params.id },
                withDeleted: true
            });

            if (data) {
                res.status(202).json(data);
            } else {
                throw new Error('Error: PATCH request failed');
            }
        } else {
            res.status(404).send();
        }
    }
}