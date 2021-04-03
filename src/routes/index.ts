import { Router } from 'express'
import { Route } from './interfaces'

import cors from './cors'
import root from './root'
import auth from './auth'
import apiRoutes from './api'

export const router = Router()

const routeInit = (route: Route) => {

    route.authorize
        ? router[route.method](route.path, ...route.authorize, ...route.actions)
        : router[route.method](route.path, ...route.actions)

}

const routes: Route[] = [
    ...cors,
    ...root,
    ...auth,
    ...apiRoutes,
]

routes.forEach(routeInit)
