import { Entity, Column, ManyToOne } from 'typeorm'
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

    @Column({ nullable: true })
    questionId: number

    @ManyToOne(() => Question, question => question.answers, {
        onDelete: 'CASCADE',
    })
    question: Question

}
