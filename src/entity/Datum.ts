import { PrimaryGeneratedColumn } from 'typeorm'

export abstract class Datum {

    @PrimaryGeneratedColumn()
    id: number

}
