import { Request, Response } from 'express'
import { getRepository, FindManyOptions, Raw } from 'typeorm'
import { User } from '../entity/User'
import { UserRole } from '../entity/UserRole'
import { defaultFindOptions, rejectedClientError, serverError } from './_helper'

export const getExaminees = (req: Request, res: Response): Promise<Response> => {

    const options: FindManyOptions = defaultFindOptions(req)

    options.where = {
        roles: Raw(alias => `FIND_IN_SET('${ UserRole.EXAMINEE }',${ alias })>0`)
    }
    options.relations = [ 'categories' ]

    return getRepository(User).find(options)
        .then(examinees => res.json(examinees))
        .catch(err => res.status(500).json({ error: err.message }))

}

export const updateExaminee = (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params
    const { examinee } = req.body

    if (!id || !examinee)
        return rejectedClientError(res, 'have no id or examinee')

    const { categories } = examinee

    if (!categories)
        return rejectedClientError(res, 'for now only categories may be updated')

    const userRepository = getRepository(User)

    return userRepository.findOne(id)
        .then(user => {

            user.categories = categories

            return userRepository.save(user)
                .then(result => res.json(result))

        })
        .catch(serverError(res))

    // return userRepository.update(id, examinee)
    //     .then(() => userRepository.findOne(id))
    //     .then(examinee => res.json(examinee))
    //     .catch(serverError(res))

}
