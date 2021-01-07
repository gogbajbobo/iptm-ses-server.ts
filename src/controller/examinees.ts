import { Request, Response } from 'express'
import { getRepository, FindManyOptions, Raw } from 'typeorm'
import { User, UserRole } from '../entity/User'
import { defaultFindOptions } from './_helper'

export const getExaminees = (req: Request, res: Response): Promise<Response> => {

    const options: FindManyOptions = defaultFindOptions(req)

    options.where = {
        roles: Raw(alias => `FIND_IN_SET('${ UserRole.EXAMINEE }',${ alias })>0`)
    }

    return getRepository(User).find(options)
        .then(examinees => res.json(examinees))
        .catch(err => res.status(500).json({ error: err.message }))

}
