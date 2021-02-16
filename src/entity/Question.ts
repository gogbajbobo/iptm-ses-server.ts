import { Entity, Column, ManyToOne, OneToMany, RelationId } from 'typeorm'
import { Section } from './Section'
import { Answer } from './Answer'
import { Datum } from './Datum'

@Entity()
export class Question extends Datum {

    @Column('text')
    text: string

    @ManyToOne(() => Section, section => section.questions, {
        onDelete: 'CASCADE',
    })
    section: Section

    @RelationId((question: Question) => question.section)
    sectionId: number

    @OneToMany(() => Answer, answer => answer.question, {
        eager: true,
    })
    answers: Answer[]

}
