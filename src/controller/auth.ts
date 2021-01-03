import { Request, Response } from 'express'
import { invokeToken } from '../services/token'


export const login = (req: Request, res: Response): Response => {
    return res.json(invokeToken(req, 'Login success'))
}

export const logout = (req: Request, res: Response): Response => {
    return res.send()
}
