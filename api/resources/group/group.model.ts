import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from "typeorm"
import { Specification } from "../specification/specification.model"
import { Component } from "../component/component.model"

@Entity()
export class Group {
    @PrimaryGeneratedColumn("uuid")
    id: string | undefined

    @Column('text')
    name: string | undefined

    @Column('text')
    groupCode: string | undefined

    @CreateDateColumn()
    created: Date | undefined

    @DeleteDateColumn()
    deleted: Date | undefined

    @ManyToOne(() => Specification, (spec) => spec.groups) // note: we will create author property in the Photo class below
    specification: Specification | undefined


    @OneToMany(() => Component, (component) => component.group)
    components: Group[] | undefined
}