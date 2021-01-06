import { Route, RouteInitializer } from './interfaces'
import passport from '../services/passport'
import { getExaminees } from '../controller/examinees'

const path = '/examinees'

const routes: Route[] = [
    {
        path,
        method: 'get',
        actions: [passport.authenticate('jwt'), getExaminees]
    },
]

export const examineesRoutesInitializer: RouteInitializer = router => {

    routes.forEach(route => {

        const { path, method, actions } = route
        router[method](path, ...actions)

    })

}
