import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Section } from './Section'

@Entity()
export class Exam {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @OneToMany(() => Section, section => section.exam, {
        eager: true,
    })
    sections: Section[]

}
