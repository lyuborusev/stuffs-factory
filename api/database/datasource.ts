import { DataSource } from "typeorm"
import { Specification } from "../resources/specification/specification.model";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [Specification],
    synchronize: true,
    logging: false,
});

export async function initializeDatasource() {
    try {


        await AppDataSource.initialize();
        console.log(`In memory Db initialized`)
    } catch (err: any) {
        console.error(`dbConnectionManager - error initializing db. Error: ${err.message}`)
    }
}