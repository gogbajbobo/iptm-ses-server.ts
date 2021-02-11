import { Quiz } from '../entity/Quiz'
import { controller } from './index'
import { Request, Response } from 'express'
import { rejectedClientError, serverError } from './_helper'
import { FindManyOptions, getRepository } from 'typeorm'

const quizController = controller(Quiz)


export default quizController
