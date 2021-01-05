import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { User } from './User'
import { Section } from './Section'

@Entity()
export class Category {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(() => User, user => user.categories)
    @JoinTable()
    users: User[]

    @OneToMany(() => Section, section => section.category)
    sections: Section[]

}
