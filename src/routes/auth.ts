import { Route } from './interfaces'
import passport from '../services/passport'
import { login, logout } from '../controller/auth'

const routes: Route[] = [
    {
        path: '/login',
        method: 'post',
        authorize: [ passport.authenticate('local') ],
        actions: [ login ]
    },
    {
        path: '/logout',
        method: 'post',
        authorize: [ passport.authenticate('jwt') ],
        actions: [ logout ]
    },
]

export default routes
