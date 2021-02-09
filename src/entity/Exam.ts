import { Entity, Column, OneToMany } from 'typeorm'
import { Section } from './Section'
import { Datum } from './Datum'

@Entity()
export class Exam extends Datum {

    @Column()
    title: string

    @OneToMany(() => Section, section => section.exam, {
        eager: true,
    })
    sections: Section[]

}
