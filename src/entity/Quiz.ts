import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm'
import { Category } from './Category'
import { Exam } from './Exam'
import { User } from './User'

@Entity()
export class Quiz {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    text: string

    @Column()
    examId: number

    @ManyToOne(() => Exam)
    exam: Exam

    @Column()
    categoryId: number

    @ManyToOne(() => Category)
    category: Category

    @ManyToMany(() => User, user => user.quizzes)
    @JoinTable()
    examinees: User[]

}
