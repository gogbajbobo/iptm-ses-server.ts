import { Route } from '../interfaces'
import passport from '../../services/passport'
import { getItems, updateItem } from '../../controller/examinees'
import { requireRoles } from '../../services/rolesChecker'
import { UserRole } from '../../entity/UserRole'

const path = '/examinees'
const pathWithId = `${ path }/:id`

const routes: Route[] = [
    {
        path,
        method: 'all',
        authorize: [
            passport.authenticate('jwt'),
            requireRoles([UserRole.EXAMINER])
        ],
        actions: []
    },
    {
        path,
        method: 'get',
        actions: [ getItems ]
    },
    {
        path: pathWithId,
        method: 'put',
        actions: [ updateItem ]
    },
]

export default routes
