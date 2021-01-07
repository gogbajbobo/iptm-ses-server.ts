import { Router, Request, Response, NextFunction } from 'express'

export type RouteActionResponse = Response | NextFunction | Promise<Response> | Promise<NextFunction> | void
export type RouteAction = (req: Request, res: Response) => RouteActionResponse

export interface Route {
    path: string
    method: 'get' | 'post' | 'put' | 'delete'
    actions: RouteAction[]
}

export interface RouteInitializer {
    (router: Router): void
}
