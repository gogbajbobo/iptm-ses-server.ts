import { Route } from '../interfaces'
import passport from '../../services/passport'
import { getCategories } from '../../controller/categories'

const path = '/categories'

const routes: Route[] = [
    {
        path,
        method: 'get',
        actions: [passport.authenticate('jwt'), getCategories]
    },
]

export default routes
