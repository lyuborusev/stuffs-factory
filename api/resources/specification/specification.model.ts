import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn } from "typeorm"

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
}