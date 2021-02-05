import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'
import { Question } from './Question'

@Entity()
export class Answer {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    text: string

    @Column()
    isCorrect: boolean

    @Column({ nullable: true })
    questionId: number

    @ManyToOne(() => Question, question => question.answers)
    question: Question

}
