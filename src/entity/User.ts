import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Category } from './Category'
import { UserRole } from './UserRole'


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

}
