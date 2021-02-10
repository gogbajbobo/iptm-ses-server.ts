import { Request, Response } from 'express'
import { getRepository, FindManyOptions, Raw, In } from 'typeorm'
import { User } from '../entity/User'
import { Category } from '../entity/Category'
import { UserRole } from '../entity/UserRole'
import { defaultFindOptions, rejectedClientError, serverError } from './_helper'

export const getItems = (req: Request, res: Response): Promise<Response> => {

    const { query } = req

    const options: FindManyOptions = defaultFindOptions(req)

    const examineeWhere = {
        roles: Raw(alias => `FIND_IN_SET('${ UserRole.EXAMINEE }',${ alias })>0`)
    }

    if (!query?.category) {

        options.where = examineeWhere

        return getRepository(User).find(options)
            .then(items => res.json(items))
            .catch(err => res.status(500).json({ error: err.message }))

    }

    const category = query.category as string

    if (!category)
        return rejectedClientError(res, 'have no category in query')

    return getRepository(Category).findOne(category)
        .then(cat => {

            const { userIds } = cat

            options.where = { ...examineeWhere, id: In(userIds) }

            return getRepository(User).find(options)
                .then(items => res.json(items))
                .catch(err => res.status(500).json({ error: err.message }))

        })

}

export const updateItem = (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params
    const { item } = req.body

    if (!id || !item)
        return rejectedClientError(res, 'have no id or item')

    const { categories } = item

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

}
