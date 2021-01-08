import { Route } from '../interfaces'
import passport from '../../services/passport'
import { getCategories, addCategory, updateCategory, deleteCategory } from '../../controller/categories'
import { requireRoles } from '../../services/rolesChecker'
import { UserRole } from '../../entity/UserRole'

const path = '/categories'
const pathWithId = `${ path }/:id`

const routes: Route[] = [
    {
        path: [ path, pathWithId ],
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
    {
        path: pathWithId,
        method: 'put',
        actions: [ updateCategory ]
    },
    {
        path: pathWithId,
        method: 'delete',
        actions: [ deleteCategory ]
    },
]

export default routes
