import { controller } from './index'
import { Question } from '../entity/Question'
import { Request, Response } from 'express'
import { FindManyOptions, getRepository } from 'typeorm'
import { defaultFindOptions, serverError } from './_helper'

const questionController = controller(Question)

const getItems = (req: Request, res: Response): Promise<Response> => {

    const { query } = req

    console.log(query)

    if (query?.quiz) {

        const options: FindManyOptions = defaultFindOptions(req)
        options.where = query

        return getRepository(Question).find(options)
            .then(items => res.json(items))
            .catch(serverError(res))

    }

    const options: FindManyOptions = defaultFindOptions(req)
    options.where = query

    return getRepository(Question).find(options)
        .then(items => res.json(items))
        .catch(serverError(res))

}

questionController.getItems = getItems

export default questionController
