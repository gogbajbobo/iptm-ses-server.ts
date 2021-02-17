import { controller } from './index'
import { Question } from '../entity/Question'
import { User } from '../entity/User'
import { Quiz } from '../entity/Quiz'
import { Exam } from '../entity/Exam'
import { Request, Response } from 'express'
import { FindManyOptions, getRepository } from 'typeorm'
import { defaultFindOptions, rejectedClientError, serverError } from './_helper'
import { isExaminee, isExaminer } from '../services/helper'

const questionController = controller(Question)

const getItems = (req: Request, res: Response): Promise<Response> => {

    const { query } = req

    if (!query)
        return rejectedClientError(res, 'request w/o query is not allowed')

    const user: User = req.user as User
    const { quiz } = query

    if (quiz && isExaminee(user))
        return getQuestionsForExaminee(req, res, Number(quiz), user)

    if (isExaminer(user))
        return getQuestionsForExaminer(req, res)

    return rejectedClientError(res, 'unknown user role')

}

const getQuestionsForExaminee = (req: Request, res: Response, quizId: number, user: User): Promise<Response> => {

    getRepository(Quiz).findOne(quizId)
        .then(quiz => {

            return getRepository(Exam)
                .createQueryBuilder('exam')
                .leftJoinAndSelect('exam.sections', 'section')
                .where({ id: quiz.examId })
                .getOne()

        })
        .then(console.log)
        .catch(console.error)

    const options: FindManyOptions = defaultFindOptions(req)
    // options.where = query

    return getRepository(Question).find(options)
        .then(items => res.json(items))
        .catch(serverError(res))

}

const getQuestionsForExaminer = (req: Request, res: Response): Promise<Response> => {

    const { query } = req

    const options: FindManyOptions = defaultFindOptions(req)
    options.where = query

    return getRepository(Question).find(options)
        .then(items => res.json(items))
        .catch(serverError(res))

}

questionController.getItems = getItems

export default questionController
