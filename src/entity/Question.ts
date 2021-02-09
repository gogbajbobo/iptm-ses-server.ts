import { Entity, Column, ManyToOne, OneToMany } from 'typeorm'
import { Section } from './Section'
import { Answer } from './Answer'
import { Datum } from './Datum'

@Entity()
export class Question extends Datum {

    @Column('text')
    text: string

    @Column({ nullable: true })
    sectionId: number

    @ManyToOne(() => Section, section => section.questions)
    section: Section

    @OneToMany(() => Answer, answer => answer.question, {
        eager: true,
    })
    answers: Answer[]

}
