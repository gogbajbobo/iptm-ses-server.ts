import { Request, Response } from 'express'
import { getManager } from 'typeorm'
import { Exam } from '../entity/Exam'

export async function examGetAllAction(req: Request, res: Response): Promise<void> {

    const examRepository = getManager().getRepository(Exam)
    const exams = await examRepository.find()

    res.send(exams)

}

export async function examGetByIdAction(req: Request, res: Response): Promise<void> {

    const examRepository = getManager().getRepository(Exam)
    const exam = await examRepository.findOne(req.params.id)

    exam ? res.send(exam) : res.status(404)

}

export async function postSaveAction(req: Request, res: Response): Promise<void> {

    const examRepository = getManager().getRepository(Exam)
    const newExam = examRepository.create(req.body)

    await examRepository.save(newExam)

    res.send(newExam)

}
