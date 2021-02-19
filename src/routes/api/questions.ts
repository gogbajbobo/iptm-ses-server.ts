import { UserRole } from '../../entity/UserRole'
import routes from './_helper'
import questionController from '../../controller/questions';

const questionRoles = {
    all: [ UserRole.EXAMINER, UserRole.EXAMINEE ],
    get: [ UserRole.EXAMINER, UserRole.EXAMINEE ],
    post: [ UserRole.EXAMINER ],
    put: [ UserRole.EXAMINER ],
    delete: [ UserRole.EXAMINER ],
}

const questions = routes(`/questions`, questionController, questionRoles)

export default questions
