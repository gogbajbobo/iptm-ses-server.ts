import { ControllerFunctions } from '../../controller'

import { Route } from '../interfaces'
import passport from '../../services/passport'
import { requireRoles } from '../../services/rolesChecker'
import { UserRole } from '../../entity/UserRole'

export const path = (filename: string): string => {

    const split = filename.split('/')
    const modulename = split[split.length - 1]
    return modulename.split('.')[0]

}

export const routes = (path: string, controller: ControllerFunctions): Route[] => {

    const { getItems, addItem, updateItem, deleteItem } = controller

    const pathWithId = `${ path }/:id`

    return [
        {
            path: [ path, pathWithId ],
            method: 'all',
            authorize: [
                passport.authenticate('jwt'),
                requireRoles([UserRole.EXAMINER]),
            ],
            actions: []
        },
        { path, method: 'get', actions: [ getItems ] },
        { path, method: 'post', actions: [ addItem ] },
        { path: pathWithId, method: 'put', actions: [ updateItem ] },
        { path: pathWithId, method: 'delete', actions: [ deleteItem ] },
    ]

}

export default routes
