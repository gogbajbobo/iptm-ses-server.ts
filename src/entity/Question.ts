import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Section } from './Section'

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    text: string

    @ManyToOne(() => Section, section => section.questions)
    section: Section

}
