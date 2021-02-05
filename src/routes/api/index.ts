import { controller } from '../../controller'
import entity from '../../entity'
import routes from './_helper'
import examinees from './examinees'

const categories = routes(`/categories`, controller(entity.Category))
const exams = routes(`/exams`, controller(entity.Exam))
const questions = routes(`/questions`, controller(entity.Question))
const sections = routes(`/sections`, controller(entity.Section))
const answers = routes(`/answers`, controller(entity.Answer))

export default [

    ...categories,
    ...exams,
    ...questions,
    ...sections,
    ...answers,

    ...examinees,

]
