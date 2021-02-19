import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Question } from '../entity/Question'

export const handleQuizAnswers = (req: Request, res: Response): Promise<Response> => {

    const answers = req.body

    const questionIds = Object.keys(answers)

    return getRepository(Question)
        .findByIds(questionIds)
        .then(questions => {

            const correctAnswers = questions.reduce((result, q) => {

                result[q.id] = q.answers.find(a => a.isCorrect).id
                return result

            }, {})

            const numberOfIncorrectAnswers = Object.keys(correctAnswers).reduce((result, qId) => {
                // count number of incorrect answers

                const isIncorrectAnswer = correctAnswers[qId] !== answers[qId]
                return result + (isIncorrectAnswer ? 1 : 0)

            }, 0)

            return res.json({ numberOfIncorrectAnswers })

        })
        .catch(err => res.status(500).json({ error: err.message }))

}
