import { Request, Response } from 'express'
import { getRepository, FindManyOptions, Raw } from 'typeorm'
import { User } from '../entity/User'
import { UserRole } from '../entity/UserRole'
import { defaultFindOptions, rejectedClientError, serverError } from './_helper'

export const getItems = (req: Request, res: Response): Promise<Response> => {

    const userRepository = getRepository(User)

    const { query } = req

    const options: FindManyOptions = defaultFindOptions(req)

    const examineeWhere = {
        roles: Raw(alias => `FIND_IN_SET('${ UserRole.EXAMINEE }',${ alias })>0`)
    }

    if (!query?.categories) {

        options.where = examineeWhere

        return userRepository.find(options)
            .then(items => res.json(items))
            .catch(err => res.status(500).json({ error: err.message }))

    }

    const categories = query.categories as string

    if (!categories)
        return rejectedClientError(res, 'have no categories in query')

    return userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.categories', 'category')
        .where(examineeWhere)
        .andWhere('category.id in (:categories)', { categories })
        .getMany()
        .then(items => res.json(items))
        .catch(err => res.status(500).json({ error: err.message }))

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
