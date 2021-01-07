import { Route } from '../interfaces'
import passport from '../../services/passport'
import { getExaminees } from '../../controller/examinees'

const path = '/examinees'

const routes: Route[] = [
    {
        path,
        method: 'get',
        actions: [passport.authenticate('jwt'), getExaminees]
    },
]

export default routes
