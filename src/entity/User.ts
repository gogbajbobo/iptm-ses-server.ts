import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm'
import { Category } from './Category'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @ManyToMany(() => Category, category => category.users)
    categories: Category[]

}
