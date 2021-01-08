import { Route } from '../interfaces'
import passport from '../../services/passport'
import { getCategories, addCategory } from '../../controller/categories'
import { requireRoles } from '../../services/rolesChecker'
import { UserRole } from '../../entity/UserRole'

const path = '/categories'

const routes: Route[] = [
    {
        path,
        method: 'all',
        authorize: [
            passport.authenticate('jwt'),
            requireRoles([UserRole.EXAMINER]),
        ],
        actions: []
    },
    {
        path,
        method: 'get',
        actions: [ getCategories ]
    },
    {
        path,
        method: 'post',
        actions: [ addCategory ]
    },
]

export default routes
