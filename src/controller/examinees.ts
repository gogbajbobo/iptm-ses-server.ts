import { getRepository, FindManyOptions, Raw } from 'typeorm'
import { User, UserRole } from '../entity/User'
import { Request, Response } from 'express'

export const getExaminees = (req: Request, res: Response): Promise<Response> => {

    const options: FindManyOptions = req.body.options || {}

    if (!options.take) options.take = 100

    options.where = {
        roles: Raw(alias => `FIND_IN_SET('${ UserRole.EXAMINEE }',${ alias })>0`)
    }

    return getRepository(User).find(options)
        .then(examinees => res.json(examinees))
        .catch(err => res.status(500).json({ error: err.message }))

}
