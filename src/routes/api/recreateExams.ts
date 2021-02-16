import { Route } from '../interfaces'
import passport from '../../services/passport'
import { recreateExams } from '../../controller/recreateExams'
import { requireRoles } from '../../services/rolesChecker'
import { UserRole } from '../../entity/UserRole'

const path = '/recreate-exams'

const routes: Route[] = [
    {
        path,
        method: 'all',
        authorize: [
            passport.authenticate('jwt'),
            requireRoles([ UserRole.ADMIN ])
        ],
        actions: []
    },
    {
        path,
        method: 'get',
        actions: [ recreateExams ]
    },
]

export default routes
