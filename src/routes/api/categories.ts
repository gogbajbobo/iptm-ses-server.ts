import { Route } from '../interfaces'
import passport from '../../services/passport'
import { getCategories, addCategory } from '../../controller/categories'
import { requireRoles } from '../../services/rolesChecker'
import { UserRole } from '../../entity/UserRole'

const path = '/categories'

const routes: Route[] = [
    {
        path,
        method: 'get',
        authorize: [
            passport.authenticate('jwt'),
            requireRoles([UserRole.EXAMINER]),
        ],
        actions: [ getCategories ]
    },
    {
        path,
        method: 'post',
        authorize: [
            passport.authenticate('jwt'),
            requireRoles([UserRole.EXAMINER]),
        ],
        actions: [ addCategory ]
    },
]

export default routes
