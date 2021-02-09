import { Entity, Column, OneToMany, ManyToOne } from 'typeorm'
import { Exam } from './Exam'
import { Question } from './Question'
import { Category } from './Category'
import { Datum } from './Datum'

@Entity()
export class Section extends Datum {

    @Column()
    title: string

    @Column()
    examId: number

    @ManyToOne(() => Exam, exam => exam.sections)
    exam: Exam

    @OneToMany(() => Question, question => question.section, {
        eager: true,
    })
    questions: Question[]

    @ManyToOne(() => Category, category => category.sections, {
        eager: true
    })
    category: Category

}
