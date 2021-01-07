import { Router } from 'express'
import { Route } from './interfaces'

import cors from './cors'
import auth from './auth'
import examinees from './api/examinees'
import categories from './api/categories'


export const router = Router()

const routeInit = (route: Route) => {

    route.authorize
        ? router[route.method](route.path, ...route.authorize, ...route.actions)
        : router[route.method](route.path, ...route.actions)

}

const routes: Route[] = [
    ...cors,
    ...auth,
    ...examinees,
    ...categories,
]

routes.forEach(routeInit)
