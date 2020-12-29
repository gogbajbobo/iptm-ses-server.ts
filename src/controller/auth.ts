import { Request, Response } from 'express'

export const login = (req: Request, res: Response): Response => {

    const { login, password } = req.body

    if (!login || !password)
        return res.status(403).json({ error: 'incomplete request' })

    return res.json({ user: { name: 'test' } })

}
