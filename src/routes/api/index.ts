import { controller } from '../../controller'
import answerController from '../../controller/answers'
import quizController from '../../controller/quizzes'
import entity from '../../entity'
import routes from './_helper'
import examinees from './examinees'
import recreateExams from './recreateExams'
import { UserRole } from '../../entity/UserRole'

const categories = routes(`/categories`, controller(entity.Category))
const exams = routes(`/exams`, controller(entity.Exam))
const questions = routes(`/questions`, controller(entity.Question))
const sections = routes(`/sections`, controller(entity.Section))
const answers = routes(`/answers`, answerController)

const quizRoles = {
    all: [ UserRole.EXAMINER, UserRole.EXAMINEE ],
    get: [ UserRole.EXAMINER, UserRole.EXAMINEE ],
    post: [ UserRole.EXAMINER ],
    put: [ UserRole.EXAMINER ],
    delete: [ UserRole.EXAMINER ],
}
const quizzes = routes(`/quizzes`, quizController, quizRoles)

export default [

    ...categories,
    ...exams,
    ...questions,
    ...sections,
    ...answers,
    ...quizzes,
    ...examinees,
    ...recreateExams,

]
