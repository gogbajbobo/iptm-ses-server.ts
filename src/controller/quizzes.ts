import { Quiz } from '../entity/Quiz'
import { User } from '../entity/User'
import { controller } from './index'
import { Request, Response } from 'express'
import { defaultFindOptions, rejectedClientError, serverError } from './_helper'
import { isExaminer, isExaminee } from '../services/helper'
import { FindManyOptions, getRepository } from 'typeorm'

const quizController = controller(Quiz)

const getItems = (req: Request, res: Response): Promise<Response> => {

    const user: User = req.user as User

    if (isExaminer(user))
        return getQuizzesForExaminer(req, res)

    if (isExaminee(user))
        return getQuizzesForExaminee(req, res, user)

    return rejectedClientError(res, 'unknown user role')

}

const getQuizzesForExaminer = (req: Request, res: Response): Promise<Response> => {

    const options: FindManyOptions = defaultFindOptions(req)

    const { query } = req
    options.where = query

    return getRepository(Quiz).find(options)
        .then(items => res.json(items))
        .catch(serverError(res))

}

const getQuizzesForExaminee = (req: Request, res: Response, user: User): Promise<Response> => {

    return getRepository(Quiz)
        .createQueryBuilder('quiz')
        .leftJoinAndSelect('quiz.exam', 'exam')
        .leftJoin('quiz.examinees', 'examinee')
        .where('examinee.id = :userId', { userId: user.id })
        .getMany()
        .then(items => res.json(items))
        .catch(err => res.status(500).json({ error: err.message }))

}

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

quizController.getItems = getItems
quizController.addItem = addItem

export default quizController
