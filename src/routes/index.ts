import { Router } from 'express'
import { Route } from './interfaces'

import cors from './cors'
import auth from './auth'
import examinees from './api/examinees'
import categories from './api/categories'
import exams from './api/exams'
import sections from './api/sections'
import questions from './api/questions'


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
    ...exams,
    ...sections,
    ...questions,
]

routes.forEach(routeInit)
