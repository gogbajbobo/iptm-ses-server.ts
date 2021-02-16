import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Exam } from '../entity/Exam'
import { rejectedClientError } from './_helper'

export const recreateExams = (req: Request, res: Response): Promise<Response> => {

    const repository = getRepository(Exam)

    return repository.find()
        .then(items => res.json(items))
        .catch(err => res.status(500).json({ error: err.message }))

}
