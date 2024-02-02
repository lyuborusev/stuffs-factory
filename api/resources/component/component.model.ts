import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne, ManyToMany, JoinTable } from "typeorm"
import { Group } from "../group/group.model"
import { Part } from "../part/part.model"

@Entity()
export class Component {
    @PrimaryGeneratedColumn("uuid")
    id: string | undefined

    @Column('text')
    name: string | undefined

    @Column('text')
    description: string | undefined

    @Column('text')
    partCode: string | undefined

    @CreateDateColumn()
    created: Date | undefined

    @DeleteDateColumn()
    deleted: Date | undefined

    @ManyToOne(() => Group, (group) => group.components)
    group: Group | undefined

    @ManyToOne(() => Part, (part)=> part.components)
    part: Part | undefined
}