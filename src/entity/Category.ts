import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm'
import { User } from './User'
import { Section } from './Section'
import { Datum } from './Datum'

@Entity()
export class Category extends Datum {

    @Column()
    title: string

    @ManyToMany(() => User, user => user.categories)
    @JoinTable()
    users: User[]

    @OneToMany(() => Section, section => section.category)
    sections: Section[]

}
