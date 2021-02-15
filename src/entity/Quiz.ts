import { Entity, ManyToOne, ManyToMany, JoinTable, RelationId } from 'typeorm'
import { Exam } from './Exam'
import { User } from './User'
import { Datum } from './Datum'

@Entity()
export class Quiz extends Datum {

    @ManyToOne(() => Exam, {
        eager: true,
    })
    exam: Exam
    @RelationId((quiz: Quiz) => quiz.exam)
    examId: number

    @ManyToMany(() => User, user => user.quizzes)
    @JoinTable()
    examinees: User[]
    @RelationId((quiz: Quiz) => quiz.examinees)
    examineeIds: number[]

}
