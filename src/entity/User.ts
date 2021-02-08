import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Category } from './Category'
import { UserRole } from './UserRole'
import { Quiz } from './Quiz'


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({
        type: 'set',
        enum: UserRole,
        default: [ UserRole.VISITOR ]
    })
    roles: UserRole[]

    @ManyToMany(() => Category, category => category.users)
    categories: Category[]

    @ManyToMany(() => Quiz, quiz => quiz.examinees)
    quizzes: Quiz[]

}
