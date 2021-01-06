import { Router } from 'express'
import { RouteInitializer } from './interfaces'
import { corsRoutesInitializer } from './cors'
import { authRoutesInitializer } from './auth'
import { examineesRoutesInitializer } from './examinees'

const routeInitializers: RouteInitializer[] = [
    corsRoutesInitializer,
    authRoutesInitializer,
    examineesRoutesInitializer,
]

export const router = Router()

routeInitializers.forEach(ri => ri(router))
