import { Entity, ManyToOne, ManyToMany, RelationId } from 'typeorm'
import { Category } from './Category'
import { Section } from './Section'
import { Exam } from './Exam'
import { User } from './User'
import { Datum } from './Datum'

@Entity()
export class Quiz extends Datum {

    @ManyToOne(() => Category)
    category: Category
    // @RelationId((quiz: Quiz) => quiz.category)
    // categoryId: number

    @ManyToOne(() => Exam)
    exam: Exam
    // @RelationId((quiz: Quiz) => quiz.exam)
    // examId: number

    @ManyToOne(() => Section, {
        eager: true,
    })
    section: Section

    @ManyToMany(() => User, user => user.quizzes)
    examinees: User[]
    // @RelationId((quiz: Quiz) => quiz.examinees)
    // examineeIds: number[]

}
