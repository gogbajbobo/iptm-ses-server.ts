import { Request } from 'express'
import { FindManyOptions } from 'typeorm'

export const defaultFindOptions = (req: Request): FindManyOptions => {

    const options: FindManyOptions = req.body.options || {}

    if (!options.take) options.take = 100

    return options

}
