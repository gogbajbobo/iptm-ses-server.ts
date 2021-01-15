import { controller } from '../../controller'
import entity from '../../entity'
import routes from './_helper'
import examinees from './examinees'

const categories = routes(`/categories`, controller(entity.Category))
const exams = routes(`/exams`, controller(entity.Exam))
const questions = routes(`/questions`, controller(entity.Question))
const sections = routes(`/sections`, controller(entity.Section))

export default [

    ...categories,
    ...exams,
    ...questions,
    ...sections,

    ...examinees,

]
