import { Router, Request, Response, NextFunction } from 'express'

export interface Route {
    path: string
    method: 'get' | 'post' | 'put' | 'delete'
    action:  (req: Request, res: Response) => Response | NextFunction
}

export interface RouteInitializer {
    (router: Router): void
}
