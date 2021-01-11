import { Section as Entity } from '../entity/Section'

import { Request, Response } from 'express'
import { getRepository, FindManyOptions } from 'typeorm'
import { defaultFindOptions, serverError, rejectedClientError } from './_helper'


export const getItems = (req: Request, res: Response): Promise<Response> => {

    const options: FindManyOptions = defaultFindOptions(req)

    return getRepository(Entity).find(options)
        .then(items => res.json(items))
        .catch(serverError(res))

}


export const addItem = (req: Request, res: Response): Promise<Response> => {

    const { item } = req.body

    if (!item)
        return rejectedClientError(res, 'have no item in request')

    return getRepository(Entity).save(item)
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
