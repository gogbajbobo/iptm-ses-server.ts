import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Category } from './Category'

export enum UserRole {
    EXAMINER = 'examiner',
    EXAMINEE = 'examinee',
    VISITOR = 'visitor',
}

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
