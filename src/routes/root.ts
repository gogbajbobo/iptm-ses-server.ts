import { Request, Response } from 'express';
import { Route } from './interfaces'


const rootAction = (req: Request, res: Response): Response => {
    return res.send('SES REST API')
}

const routes: Route[] = [
    {
        path: '/',
        method: 'get',
        actions: [ rootAction ]
    },
]


export default routes
