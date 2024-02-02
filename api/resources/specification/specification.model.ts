import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn, OneToMany } from "typeorm"
import { Group } from "../group/group.model"

@Entity()
export class Specification {
    @PrimaryGeneratedColumn("uuid")
    id: string | undefined

    @Column('text')
    name: string | undefined

    @Column('text')
    codeNumber: string | undefined

    @CreateDateColumn()
    created: Date | undefined

    @DeleteDateColumn()
    deleted: Date | undefined

    @Column('boolean', { default: false })
    completed: boolean | undefined

    @OneToMany(() => Group, (group) => group.specification, {
        cascade: true
    })
    groups: Group[] | undefined
}