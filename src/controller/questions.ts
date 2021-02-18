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
        return getQuestionsForExaminee(req, res)

    if (isExaminer(user))
        return getQuestionsForExaminer(req, res)

    return rejectedClientError(res, 'unknown user role')

}

type NOfQType = Record<'section' | 'numberOfQuestions', number>
const getNumberOfQuestions = (user: User, exam: Exam): NOfQType[] => {

    const userCategoryIds = user.categoryIds
    const examCategoryIds = exam.sections.map(s => s.categoryId)
    const catIds = arrayIntersect(userCategoryIds, examCategoryIds)
    const sections = exam.sections.filter(s => catIds.includes(s.categoryId))
    const sectionIds = sections.map(s => s.id)

    const questionsInSection = intDivision(NUMBER_OF_QUESTIONS, sectionIds.length)

    const numberOfQuestions: NOfQType[] = sectionIds.reduce((result: NOfQType[], sId, i) => {

        const addition = i < questionsInSection.reminder ? 1 : 0
        result[i] = { section: sId, numberOfQuestions: questionsInSection.quotient + addition }

        return result

    }, [])


    return numberOfQuestions

}

const getQuestionsForQuiz = (result: Record<'section' | 'numberOfQuestions', number>[]) => {

    const promises = result.map(r => {

        return getRepository(Question)
            .createQueryBuilder('question')
            .where(`sectionId = :section`, {section: r.section})
            .leftJoinAndSelect('question.answers', 'answer')
            .orderBy('RAND()')
            .limit(r.numberOfQuestions)
            .getMany()

    })

    return Promise.all(promises)

}

const getQuestionsForExaminee = (req: Request, res: Response): Promise<Response> => {

    const { query } = req
    const quizId = Number(query.quiz)
    const user: User = req.user as User

    return getRepository(Quiz).findOne(quizId)
        .then(quiz => {

            return getRepository(Exam)
                .findOne(quiz.examId, { relations: [ 'sections' ] })
                .then(exam => getNumberOfQuestions(user, exam))
                .then(result => getQuestionsForQuiz(result))

        })
        .then(questions => questions.flat())
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
