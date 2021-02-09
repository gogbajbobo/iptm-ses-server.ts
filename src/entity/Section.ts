import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm'
import { Exam } from './Exam'
import { Question } from './Question'
import { Category } from './Category'

@Entity()
export class Section {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

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
