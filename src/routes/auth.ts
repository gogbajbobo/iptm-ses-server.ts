import { Route, RouteInitializer } from './interfaces'
import { login, logout } from '../controller/auth'

const authRoutes: Route[] = [
    {
        path: '/login',
        method: 'post',
        action: login
    },
    {
        path: '/logout',
        method: 'post',
        action: logout
    },
]

export const authRoutesInitializer: RouteInitializer = router => {

    authRoutes.forEach(route => {

        const { path, method, action } = route
        router[method](path, action)

    })

}
