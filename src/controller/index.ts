import { Request, Response } from 'express'
import { getRepository, FindManyOptions } from 'typeorm'
import { defaultFindOptions, serverError, rejectedClientError } from './_helper'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Class<T> = new (...args: any[]) => T

type RequestHandler = (req: Request, res: Response) => Promise<Response>

export type ControllerFunctions = {
    getItems: RequestHandler
    addItem: RequestHandler
    updateItem: RequestHandler
    deleteItem: RequestHandler
}

const getItems = <T>(Entity: Class<T>): RequestHandler => {

    return (req: Request, res: Response): Promise<Response> => {

        const { query } = req

        const options: FindManyOptions = defaultFindOptions(req)
        options.where = query

        return getRepository(Entity).find(options)
            .then(items => res.json(items))
            .catch(serverError(res))

    }

}

const addItem = <T>(Entity: Class<T>): RequestHandler => {

    return (req: Request, res: Response): Promise<Response> => {

        const { item } = req.body

        if (!item)
            return rejectedClientError(res, 'have no item in request')

        const itemRepository = getRepository(Entity)

        return itemRepository.save(item)
            .then(item => itemRepository.findOne(item))
            .then(item => res.json(item))
            .catch(serverError(res))

    }

}

const updateItem = <T>(Entity: Class<T>): RequestHandler => {

    return (req: Request, res: Response): Promise<Response> => {

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

}

const deleteItem = <T>(Entity: Class<T>): RequestHandler => {

    return (req: Request, res: Response): Promise<Response> => {

        const { id } = req.params

        if (!id)
            return rejectedClientError(res, 'have no id for item')

        return getRepository(Entity).delete(id)
            .then(result => res.json(result))
            .catch(serverError(res))

    }

}

export const controller = <T>(Entity: Class<T>): ControllerFunctions => {

    return {

        getItems: getItems(Entity),
        addItem: addItem(Entity),
        updateItem: updateItem(Entity),
        deleteItem: deleteItem(Entity),

    }

}
