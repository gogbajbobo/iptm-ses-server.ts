import { Question as Entity } from '../entity/Question'

import { Request, Response } from 'express'
import { getRepository, FindManyOptions } from 'typeorm'
import { defaultFindOptions, serverError, rejectedClientError } from './_helper'


export const getItems = (req: Request, res: Response): Promise<Response> => {

    const { query } = req

    const options: FindManyOptions = defaultFindOptions(req)
    options.where = query

    return getRepository(Entity).find(options)
        .then(items => res.json(items))
        .catch(serverError(res))

}

export const addItem = (req: Request, res: Response): Promise<Response> => {

    const { item } = req.body

    if (!item)
        return rejectedClientError(res, 'have no item in request')

    const itemRepository = getRepository(Entity)

    return itemRepository.save(item)
        .then(item => itemRepository.findOne(item))
        .then(item => res.json(item))
        .catch(serverError(res))

}

export const updateItem = (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params
    const { item } = req.body

    if (!id || !item)
        return rejectedClientError(res, 'have no id or item')

    const itemRepository = getRepository(Entity)

    return itemRepository.update(id, item)
        .then(() => itemRepository.findOne(id))
        .then(item => res.json(item))
        .catch(serverError(res))

}

export const deleteItem = (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params

    if (!id)
        return rejectedClientError(res, 'have no id for item')

    return getRepository(Entity).delete(id)
        .then(result => res.json(result))
        .catch(serverError(res))

}
