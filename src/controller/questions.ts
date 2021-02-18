import { controller } from './index'
import { Question } from '../entity/Question'
import { User } from '../entity/User'
import { Quiz } from '../entity/Quiz'
import { Exam } from '../entity/Exam'
import { Request, Response } from 'express'
import { FindManyOptions, getRepository } from 'typeorm'
import { defaultFindOptions, rejectedClientError, serverError } from './_helper'
import {arrayIntersect, intDivision, isExaminee, isExaminer} from '../services/helper'
import { NUMBER_OF_QUESTIONS } from '../services/constants'

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
                .where({ id: quiz.examId })
                .leftJoinAndSelect('exam.sections', 'section')
                .getOne()
                .then(exam => {

                    const userCategoryIds = user.categoryIds
                    const examCategoryIds = exam.sections.map(s => s.categoryId)
                    const catIds = arrayIntersect(userCategoryIds, examCategoryIds)
                    const sections = exam.sections.filter(s => catIds.includes(s.categoryId))
                    const sectionIds = sections.map(s => s.id)

                    const questionsInSection = intDivision(NUMBER_OF_QUESTIONS, sectionIds.length)

                    return { userCategoryIds, examCategoryIds, catIds, sectionIds, questionsInSection }

                })

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
