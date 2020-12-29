import { Router } from 'express'
import { RouteInitializer } from './interfaces'
import { initAuthRoutes } from './auth'

const routeInitializers: RouteInitializer[] = [
    initAuthRoutes,
]

export const router = Router()

routeInitializers.forEach(ri => ri(router))
