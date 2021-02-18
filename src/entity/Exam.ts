import { Entity, Column, OneToMany, RelationId } from 'typeorm'
import { Section } from './Section'
import { Datum } from './Datum'

@Entity()
export class Exam extends Datum {

    @Column()
    title: string

    @OneToMany(() => Section, section => section.exam)
    sections: Section[]
    @RelationId((exam: Exam) => exam.sections)
    sectionIds: number[]

}
