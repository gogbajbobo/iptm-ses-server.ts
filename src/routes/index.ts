import { Router } from 'express'
import { RouteInitializer } from './interfaces'
import { corsRoutesInitializer } from './cors'
import { authRoutesInitializer } from './auth'

const routeInitializers: RouteInitializer[] = [
    corsRoutesInitializer,
    authRoutesInitializer,
]

export const router = Router()

routeInitializers.forEach(ri => ri(router))
