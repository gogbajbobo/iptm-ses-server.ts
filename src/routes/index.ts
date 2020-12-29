import { Router } from 'express'
import { RouteInitializer } from './interfaces'
import { authRoutesInitializer } from './auth'

const routeInitializers: RouteInitializer[] = [
    authRoutesInitializer,
]

export const router = Router()

routeInitializers.forEach(ri => ri(router))
