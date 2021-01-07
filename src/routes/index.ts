import { Router } from 'express'
import { Route } from './interfaces'

import { corsRoutesInitializer } from './cors'
import auth from './auth'
import examinees from './examinees'
import categories from './categories'


export const router = Router()

corsRoutesInitializer(router)

const routeInit = (route: Route) => {
    router[route.method](route.path, ...route.actions)
}

const routes: Route[] = [
    ...auth,
    ...examinees,
    ...categories,
]

routes.forEach(routeInit)
