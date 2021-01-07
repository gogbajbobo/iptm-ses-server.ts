import { Route } from './interfaces'
import passport from '../services/passport'
import { login, logout } from '../controller/auth'

const routes: Route[] = [
    {
        path: '/login',
        method: 'post',
        actions: [passport.authenticate('local'), login]
    },
    {
        path: '/logout',
        method: 'post',
        actions: [passport.authenticate('jwt'), logout]
    },
]

export default routes
