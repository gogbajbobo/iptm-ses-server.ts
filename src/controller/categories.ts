import { Request, Response } from 'express'
import { getRepository, FindManyOptions } from 'typeorm'
import { Category } from '../entity/Category'
import { defaultFindOptions } from './_helper'

export const getCategories = (req: Request, res: Response): Promise<Response> => {

    const options: FindManyOptions = defaultFindOptions(req)

    return getRepository(Category).find(options)
        .then(categories => res.json(categories))
        .catch(err => res.status(500).json({ error: err.message }))

}
