import { DataSource } from "typeorm"
import { Specification } from "../resources/specification/specification.model";
import { Group } from "../resources/group/group.model";
import { Component } from "../resources/component/component.model";
import { Part } from "../resources/part/part.model";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [
        Specification,
        Group,
        Component,
        Part
    ],
    synchronize: true,
    logging: false,


    //logging: true, // Enable query logging
    //logger: 'advanced-console', // Use advanced console logger
});

export async function initializeDatasource() {
    try {
        await AppDataSource.initialize();
        console.log(`In memory Db initialized`)
    } catch (err: any) {
        console.error(`dbConnectionManager - error initializing db. Error: ${err.message}`)
    }
}