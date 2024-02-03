import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Component } from "../component/component.model";

@Entity()
export class Part {
    @PrimaryGeneratedColumn("uuid")
    id: string | undefined

    @Column('text')
    name: string | undefined

    @CreateDateColumn()
    created: Date | undefined

    @DeleteDateColumn()
    deleted: Date | undefined

    @OneToMany(() => Component, (component) => component.part, {
        cascade: true
    })
    components: Component[] | undefined
}