import { UserRole } from '../../entity/UserRole'
import routes from './_helper'
import quizController from '../../controller/quizzes'

const quizRoles = {
    all: [ UserRole.EXAMINER, UserRole.EXAMINEE ],
    get: [ UserRole.EXAMINER, UserRole.EXAMINEE ],
    post: [ UserRole.EXAMINER ],
    put: [ UserRole.EXAMINER ],
    delete: [ UserRole.EXAMINER ],
}

const quizzes = routes(`/quizzes`, quizController, quizRoles)

export default quizzes
