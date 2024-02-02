import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, ManyToOne } from "typeorm"
import { Group } from "../group/group.model"

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

    @ManyToOne(() => Group, (group) => group.components) // note: we will create author property in the Photo class below
    group: Group | undefined
}