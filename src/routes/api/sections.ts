import { controller } from '../../controller'
import { Section } from '../../entity/Section'

import { Route } from '../interfaces'
import passport from '../../services/passport'
import { requireRoles } from '../../services/rolesChecker'
import { UserRole } from '../../entity/UserRole'

const { getItems, addItem, updateItem, deleteItem } = controller(Section)

const path = '/sections'
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
        actions: [ getItems ]
    },
    {
        path,
        method: 'post',
        actions: [ addItem ]
    },
    {
        path: pathWithId,
        method: 'put',
        actions: [ updateItem ]
    },
    {
        path: pathWithId,
        method: 'delete',
        actions: [ deleteItem ]
    },
]

export default routes
