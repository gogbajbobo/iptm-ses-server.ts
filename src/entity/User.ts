import { Entity, Column, ManyToMany, RelationId } from 'typeorm'
import { Category } from './Category'
import { UserRole } from './UserRole'
import { Quiz } from './Quiz'
import { Datum } from './Datum'

@Entity()
export class User extends Datum {

    @Column()
    username: string

    @Column({
        type: 'set',
        enum: UserRole,
        default: [ UserRole.VISITOR ]
    })
    roles: UserRole[]

    @ManyToMany(() => Category, category => category.users, {
        eager: true,
    })
    categories: Category[]
    @RelationId((user: User) => user.categories)
    categoryIds: number[]

    @ManyToMany(() => Quiz, quiz => quiz.examinees)
    quizzes: Quiz[]

}
