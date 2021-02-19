import { Request, Response } from 'express'

export const handleQuizAnswers = (req: Request, res: Response): Promise<Response> => {

    return Promise.resolve()
        .then(() => res.json({ ok: true }))
        .catch(err => res.status(500).json({ error: err.message }))

}
