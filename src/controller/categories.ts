import { Request, Response } from 'express'
import { getRepository, FindManyOptions } from 'typeorm'
import { Category } from '../entity/Category'
import { defaultFindOptions, serverError, rejectedClientError } from './_helper'

export const getCategories = (req: Request, res: Response): Promise<Response> => {

    const options: FindManyOptions = defaultFindOptions(req)

    return getRepository(Category).find(options)
        .then(categories => res.json(categories))
        .catch(serverError(res))

}

export const addCategory = (req: Request, res: Response): Promise<Response> => {

    const { category } = req.body

    if (!category)
        return rejectedClientError(res, 'have no category in request')

    return getRepository(Category).save(category)
        .then(category => res.json(category))
        .catch(serverError(res))

}
