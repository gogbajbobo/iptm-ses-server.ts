import { Request, Response } from 'express'
import { examGetAllAction, examGetByIdAction, postSaveAction } from '../controller/exam'

export interface Route {
    path: string
    method: 'get' | 'post' | 'put' | 'delete'
    action:  (req: Request, res: Response) => Promise<void>
}

export const AppRoutes: Route[] = [
    {
        path: '/exams',
        method: 'get',
        action: examGetAllAction
    },
    {
        path: '/exams/:id',
        method: 'get',
        action: examGetByIdAction
    },
    {
        path: '/exams',
        method: 'post',
        action: postSaveAction
    }
]
