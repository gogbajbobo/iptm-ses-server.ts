import { Entity, Column, ManyToOne, RelationId } from 'typeorm'
import { Question } from './Question'
import { Datum } from './Datum'

@Entity()
export class Answer extends Datum {

    @Column('text')
    text: string

    @Column({
        default: false
    })
    isCorrect: boolean

    @ManyToOne(() => Question, question => question.answers, {
        onDelete: 'CASCADE',
    })
    question: Question
    @RelationId((answer: Answer) => answer.question)
    questionId: number

}
