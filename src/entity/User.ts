import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Category } from './Category'

export enum UserRole {
    EXAMINER = 'examiner',
    EXAMINEE = 'examinee',
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
        default: [ UserRole.EXAMINEE ]
    })
    role: UserRole[]

    @ManyToMany(() => Category, category => category.users)
    categories: Category[]

}
