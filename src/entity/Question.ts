import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Section } from './Section'

@Entity()
export class Question {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    text: string

    @Column({ nullable: true })
    sectionId: number

    @ManyToOne(() => Section, section => section.questions)
    section: Section

}
