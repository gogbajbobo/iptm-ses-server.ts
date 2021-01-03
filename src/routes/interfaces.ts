import { Router, Request, Response, NextFunction } from 'express'

export type RouteAction = (req: Request, res: Response) => Response | NextFunction

export interface Route {
    path: string
    method: 'get' | 'post' | 'put' | 'delete'
    actions: RouteAction[]
}

export interface RouteInitializer {
    (router: Router): void
}
