import {Route} from '../interfaces'
import passport from '../../services/passport'
import {getCategories} from '../../controller/categories'
import {requireRoles} from '../../services/rolesChecker'
import { UserRole } from '../../entity/User'

const path = '/categories'

const routes: Route[] = [
    {
        path,
        method: 'get',
        actions: [passport.authenticate('jwt'), requireRoles([UserRole.EXAMINER]), getCategories]
    },
]

export default routes
