import { Quiz } from '../entity/Quiz'
import { controller } from './index'
import { Request, Response } from 'express'
import { rejectedClientError, serverError } from './_helper'
import { getRepository } from 'typeorm'

const quizController = controller(Quiz)

const addItem = (req: Request, res: Response): Promise<Response> => {

    const { item } = req.body

    if (!item)
        return rejectedClientError(res, 'have no item in request')

    // very strange way to save many-to-many relations
    // TODO: have to decide which side responsible for that, server or client
    item.examinees = item.examinees.map(e => ({ id: e }))

    const itemRepository = getRepository(Quiz)

    return itemRepository.save(item)
        .then(quiz => itemRepository.findOne(quiz.id))
        .then(quiz => res.json(quiz))
        .catch(serverError(res))

}

quizController.addItem = addItem

export default quizController
