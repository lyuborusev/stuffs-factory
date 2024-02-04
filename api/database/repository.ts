import { DeepPartial, ObjectLiteral, Repository } from "typeorm";
import { AppDataSource } from "./datasource";
import { table } from "console";

export type PaginatedEntityData<EntityType extends ObjectLiteral> = {
    data: EntityType[]
    take: number
    skip: number
    total: number
}

export class PaginationData {
    take: number;
    skip: number;

    constructor(take: number | undefined, skip: number | undefined) {
        this.take = take ? parseInt(take.toString(), 10) : 10;
        this.skip = skip ? parseInt(skip.toString(), 10) : 10;
    }

}

export class DataRepository<EntityType extends ObjectLiteral> {
    private repo: Repository<EntityType>;

    constructor(entityType: new () => EntityType) {
        this.repo = AppDataSource.getRepository(entityType);
    }

    async save(data: DeepPartial<EntityType>): Promise<EntityType> {
        const instance = this.repo.create(data);
        const saved = await this.repo.save(instance);
        return saved;
    }

    async getById(index: any): Promise<EntityType | null> {
        const dataArray = await this.repo.find({
            where: {
                id: index,
            },
            loadRelationIds: true
        });
        if (dataArray.length > 0) {
            return dataArray[0];
        } else {
            return null;
        }
    }

    async getAll(pagination: PaginationData): Promise<PaginatedEntityData<EntityType>> {
        const [data, total] = await this.repo.findAndCount({
            loadRelationIds: true,
            take: pagination.take,
            skip: pagination.skip,
        });
        const result: PaginatedEntityData<EntityType> = {
            data: data,
            total: total,
            take: pagination.take,
            skip: pagination.skip,

        };

        return result;
    }

    async delete(index: any): Promise<EntityType | null> {
        const result = await this.repo.softDelete({
            id: index
        });

        if (result && result.affected && result.affected > 0) {
            const deletedArray = await this.repo.find({
                where: { id: index },
                loadRelationIds: true,
                withDeleted: true
            });

            if (deletedArray.length > 0) {
                return deletedArray[0];
            } else {
                throw new Error("Database Repository DELETE failed!")
            }

        } else {
            return null;
        }
    }

    async update(index: any, data: any): Promise<EntityType | null> {
        const result = await this.repo.update(
            index,
            data
        );

        if (result && result.affected && result.affected > 0) {
            const updatedArray = await this.repo.find({
                where: {
                    id: index
                },
                loadRelationIds: true
            });

            if (updatedArray.length > 0) {
                return updatedArray[0];
            } else {
                throw new Error("Database Repository UPDATE failed!")
            }
        } else {
            return null
        }
    }
};