import { Route, RouteInitializer } from './interfaces'
import passport from '../services/passport'
import { login, logout } from '../controller/auth'

const authRoutes: Route[] = [
    {
        path: '/login',
        method: 'post',
        actions: [passport.authenticate('local'), login]
    },
    {
        path: '/logout',
        method: 'post',
        actions: [logout]
    },
]

export const authRoutesInitializer: RouteInitializer = router => {

    authRoutes.forEach(route => {

        const { path, method, actions } = route
        router[method](path, ...actions)

    })

}
