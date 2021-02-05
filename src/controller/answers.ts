import { Answer } from '../entity/Answer'
import { controller } from './index'
import { Request, Response } from 'express'
import { rejectedClientError, serverError } from './_helper'
import { FindManyOptions, getRepository } from 'typeorm'

const answerController = controller(Answer)

const updateAnswer = (req: Request, res: Response): Promise<Response> => {

    const { id } = req.params
    const { item } = req.body

    if (!id || !item)
        return rejectedClientError(res, 'have no id or item')

    const itemRepository = getRepository(Answer)

    return itemRepository.findOne(id)
        .then(answer => {

            // only text to change or isCorrect set to false
            if (answer.isCorrect === item.isCorrect || item.isCorrect === false) {

                const { text, isCorrect } = item

                answer.text = text
                answer.isCorrect = isCorrect

                return itemRepository.save(answer)
                    .then(result => res.json(result))

            }

            //only isCorrect set to true

            const { questionId } = answer

            const options: FindManyOptions = {
                where: { questionId, isCorrect: true }
            }

            return itemRepository.find(options)
                .then(answers => {

                    answers.forEach(a => a.isCorrect = false)
                    answer.isCorrect = true

                    return itemRepository.save([ ...answers, answer ])
                        .then(result => res.json(result))

                })

        })
        .catch(serverError(res))

}

answerController.updateItem = updateAnswer

export default answerController
