import { Route, RouteInitializer } from './interfaces'
import { login } from '../controller/auth'

const authRoutes: Route[] = [
    {
        path: '/login',
        method: 'post',
        action: login
    },
]

export const initAuthRoutes: RouteInitializer = router => {

    authRoutes.forEach(route => {

        const { path, method, action } = route
        router[method](path, action)

    })

}
