import { Request, Response } from 'express'
import { getRepository, FindManyOptions } from 'typeorm'
import { Category } from '../entity/Category'
import { defaultFindOptions, serverError, rejectedClientError } from './_helper'

export const getCategories = (req: Request, res: Response): Promise<Response> => {

    const options: FindManyOptions = defaultFindOptions(req)

    return getRepository(Category).find(options)
        .then(items => res.json(items))
        .catch(serverError(res))

}

export const addCategory = (req: Request, res: Response): Promise<Response> => {

    const { item } = req.body

    if (!item)
        return rejectedClientError(res, 'have no item in request')

    return getRepository(Category).save(item)
        .then(item => res.json(item))
        .catch(serverError(res))

}

export const updateCategory = (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params
    const { item } = req.body

    if (!id || !item)
        return rejectedClientError(res, 'have no id or item')

    const categoryRepository = getRepository(Category)

    return categoryRepository.update(id, item)
        .then(() => categoryRepository.findOne(id))
        .then(item => res.json(item))
        .catch(serverError(res))

}

export const deleteCategory = (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    if (!id)
        return rejectedClientError(res, 'have no id for item')

    return getRepository(Category).delete(id)
        .then(result => res.json(result))
        .catch(serverError(res))

}
