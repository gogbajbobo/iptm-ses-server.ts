import { Route } from '../interfaces'
import passport from '../../services/passport'
import { handleQuizAnswers } from '../../controller/quizAnswers'
import { requireRoles } from '../../services/rolesChecker'
import { UserRole } from '../../entity/UserRole'

const path = '/quiz-answers'

const routes: Route[] = [
    {
        path,
        method: 'post',
        authorize: [
            passport.authenticate('jwt'),
            requireRoles([ UserRole.EXAMINEE ])
        ],
        actions: [ handleQuizAnswers ]
    },
]

export default routes
