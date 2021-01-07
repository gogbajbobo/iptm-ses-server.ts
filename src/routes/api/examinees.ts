import { Route } from '../interfaces'
import passport from '../../services/passport'
import { getExaminees } from '../../controller/examinees'
import { requireRoles } from '../../services/rolesChecker'
import { UserRole } from '../../entity/UserRole'

const path = '/examinees'

const routes: Route[] = [
    {
        path,
        method: 'get',
        authorize: [
            passport.authenticate('jwt'),
            requireRoles([UserRole.EXAMINER])
        ],
        actions: [ getExaminees ]
    },
]

export default routes
