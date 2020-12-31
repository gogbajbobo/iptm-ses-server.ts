import { Request, Response } from 'express'

type UserType = {
    id: string
    name: string
    accessToken: string
}

const testUser: UserType = {
    id: '0',
    name: 'test',
    accessToken: 'accessToken',
}

export const login = (req: Request, res: Response): Response => {

    const { login, password } = req.body

    if (!login || !password)
        return res.status(403).json({ error: 'incomplete request' })

    return res.json(testUser)

}

export const logout = (req: Request, res: Response): Response => {
    return res.send()
}
