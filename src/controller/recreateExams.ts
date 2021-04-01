import { Request, Response } from 'express'
import { getConnection, getRepository } from 'typeorm'
import { rejectedClientError } from './_helper'
import { User } from '../entity/User'
import { UserRole } from '../entity/UserRole'
import { Category } from '../entity/Category'
import { Exam } from '../entity/Exam'
import { Section } from '../entity/Section'
import { Question } from '../entity/Question'
import { Answer } from '../entity/Answer'
import { isAdmin } from '../services/helper'

interface UserEmbryo {
    username: string
    roles: UserRole[]
}

const testUsers: UserEmbryo[] = [
    { username: 'admin', roles: [ UserRole.ADMIN, UserRole.EXAMINER, UserRole.EXAMINEE ] },
    { username: 'user', roles: [ UserRole.EXAMINEE ] },
    { username: 'user1', roles: [ UserRole.EXAMINEE ] },
    { username: 'user2', roles: [ UserRole.EXAMINEE ] },
]

const testCategories = [
    { title: 'Общая' },
    { title: 'Электричество' },
    { title: 'Радиация' },
    { title: 'Химия' },
    { title: 'Сосуды' },
]

const testExams = [
    { title: 'Общий экзамен' },
    { title: 'Экзамен по электричеству' },
    { title: 'Экзамен по радиации' },
    { title: 'Экзамен по химии' },
    { title: 'Экзамен по сосудам' },
]

const getRandomInt = (min, max) => {

    const _min = Math.ceil(min)
    const _max = Math.floor(max)

    return Math.floor(Math.random() * (_max - _min) + _min)

}

// this method recreate dummy exams for testing purpose only
// do not use it in production mode
export const recreateExams = (req: Request, res: Response): Promise<Response> => {

    const user: User = req.user as User

    if (!isAdmin(user))
        return rejectedClientError(res, 'You should be admin but you are not')

    const connection = getConnection()

    const userRepository = getRepository(User)
    const categoryRepository = getRepository(Category)
    const examRepository = getRepository(Exam)
    const sectionRepository = getRepository(Section)
    const questionRepository = getRepository(Question)
    const answerRepository = getRepository(Answer)

    return connection.synchronize(true)
        .then(() => userRepository.save(testUsers))
        .then(() => categoryRepository.save(testCategories))
        .then(() => examRepository.save(testExams))
        .then(() => {

            const testSections = [1, 2, 3, 4, 5].map(id => {

                if (id === 1)
                    return [1, 2, 3, 4, 5].map(n => {
                        return { title: `Секция ${ id }.${ n }`, exam: { id }, category: { id: n } }
                    })
                return { title: `Секция ${ id }.1`, exam: { id }, category: { id } }

            }).flat()

            return sectionRepository.save(testSections)
                .then(() => examRepository.find({ relations: ['sections'] }))

        })
        .then(exams => {

            const testQuestions = exams.map(exam => {

                const et = exam.title

                return exam.sections.map(section => {

                    const st = section.title
                    const ct = section.category.title
                    const numberOfQuestions = getRandomInt(20, 30)
                    const questionNumbers = [ ...Array(numberOfQuestions).keys() ]

                    return questionNumbers.map(qn => {

                        const questionName = `Вопрос №${ qn + 1 }: ${ et } / ${ st } / ${ ct }`
                        return { text: questionName, section }

                    }).flat()

                }).flat()

            }).flat()

            return questionRepository.save(testQuestions)

        })
        .then(questions => {

            const testAnswers = questions.map(question => {

                const numberOfAnswers = getRandomInt(3, 6)
                const answerNumbers = [ ...Array(numberOfAnswers).keys() ]

                return answerNumbers.map((an, index) => {

                    const answerName = `Ответ №${ an + 1 }`
                    return { text: answerName, isCorrect: index === 0, question }

                })

            }).flat()

            return answerRepository.save(testAnswers)
                .then(result => console.log(result))

        })
        .then(() => {

            return examRepository.find()
                .then(items => res.json(items))
                .catch(err => res.status(500).json({ error: err.message }))

        })

}
