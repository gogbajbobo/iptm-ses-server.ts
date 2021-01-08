import { Route } from '../interfaces'
import passport from '../../services/passport'
import { getExaminees } from '../../controller/examinees'
import { requireRoles } from '../../services/rolesChecker'
import { UserRole } from '../../entity/UserRole'

const path = '/examinees'

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
        actions: [ getExaminees ]
    },
]

export default routes
