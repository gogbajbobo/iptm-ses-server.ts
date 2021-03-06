import { controller } from '../../controller'
import entity from '../../entity'
import routes from './_helper'
import answerController from '../../controller/answers'
import quizzes from './quizzes'
import questions from './questions'
import examinees from './examinees'
import recreateExams from './recreateExams'
import quizAnswers from './quizAnswers'

const categories = routes(`/categories`, controller(entity.Category))
const exams = routes(`/exams`, controller(entity.Exam))
const sections = routes(`/sections`, controller(entity.Section))
const answers = routes(`/answers`, answerController)

export default [

    ...categories,
    ...exams,
    ...questions,
    ...sections,
    ...answers,
    ...quizzes,
    ...examinees,
    ...recreateExams,
    ...quizAnswers,

]
