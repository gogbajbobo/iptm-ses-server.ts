import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm'
import { Section } from './Section'
import { Answer } from './Answer'

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

    @OneToMany(() => Answer, answer => answer.question)
    answers: Answer[]

}
