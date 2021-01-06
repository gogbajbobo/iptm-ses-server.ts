import { Router, Request, Response, NextFunction } from 'express'

type RouteActionResponse = Response | NextFunction | Promise<Response> | Promise<NextFunction>
export type RouteAction = (req: Request, res: Response) => RouteActionResponse

export interface Route {
    path: string
    method: 'get' | 'post' | 'put' | 'delete'
    actions: RouteAction[]
}

export interface RouteInitializer {
    (router: Router): void
}
