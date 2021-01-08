import { Request, Response, NextFunction } from 'express'

export type RouteActionResponse = Response | NextFunction | Promise<Response> | Promise<NextFunction> | void
export type RouteAction = (req: Request, res: Response, next?: NextFunction) => RouteActionResponse

export interface Route {
    path: string | string[]
    method: 'get' | 'post' | 'put' | 'delete' | 'all'
    authorize?: RouteAction[]
    actions: RouteAction[]
}
