import { ControllerFunctions } from '../../controller'

import { Route } from '../interfaces'
import passport from '../../services/passport'
import { requireRoles } from '../../services/rolesChecker'
import { UserRole } from '../../entity/UserRole'

export const routes = (
    path: string,
    controller: ControllerFunctions,
    roles?: Record<string, UserRole[]>
): Route[] => {

    const { getItems, addItem, updateItem, deleteItem } = controller

    const pathWithId = `${ path }/:id`

    return [
        {
            path: [ path, pathWithId ],
            method: 'all',
            authorize: [
                passport.authenticate('jwt'),
                roles?.all ? requireRoles(roles?.all) : requireRoles([UserRole.EXAMINER]),
            ],
            actions: []
        },
        {
            path,
            method: 'get',
            actions: [ getItems ],
            authorize: roles?.get ? [ requireRoles(roles?.get) ] : null
        },
        {
            path,
            method: 'post',
            actions: [ addItem ],
            authorize: roles?.post ? [ requireRoles(roles?.post) ] : null
        },
        {
            path: pathWithId,
            method: 'put',
            actions: [ updateItem ],
            authorize: roles?.put ? [ requireRoles(roles?.put) ] : null
        },
        {
            path: pathWithId,
            method: 'delete',
            actions: [ deleteItem ],
            authorize: roles?.delete ? [ requireRoles(roles?.delete) ] : null
        },
    ]

}

export default routes
