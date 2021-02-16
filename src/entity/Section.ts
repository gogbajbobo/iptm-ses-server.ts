import { Entity, Column, OneToMany, ManyToOne, RelationId } from 'typeorm'
import { Exam } from './Exam'
import { Question } from './Question'
import { Category } from './Category'
import { Datum } from './Datum'

@Entity()
export class Section extends Datum {

    @Column()
    title: string

    @ManyToOne(() => Exam, exam => exam.sections, {
        onDelete: 'CASCADE',
        eager: true,
    })
    exam: Exam

    @RelationId((section: Section) => section.exam)
    examId: number

    @OneToMany(() => Question, question => question.section)
    questions: Question[]

    @RelationId((section: Section) => section.questions)
    questionIds: number[]

    @ManyToOne(() => Category, category => category.sections, {
        eager: true
    })
    category: Category

}
