import { Request, Response } from 'express'
import { getConnection, getRepository } from 'typeorm'
import { rejectedClientError } from './_helper'
import { User } from '../entity/User'
import { UserRole } from '../entity/UserRole'
import { Exam } from '../entity/Exam'
import { Section } from '../entity/Section'
import { Question } from '../entity/Question'
import { Answer } from '../entity/Answer'

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

// this method recreate dummy exams for testing purpose only
// do not use it in production mode
export const recreateExams = (req: Request, res: Response): Promise<Response> => {

    const user: User = req.user as User

    if (!user.roles.includes(UserRole.ADMIN))
        return rejectedClientError(res, 'You should be admin but you are not')

    const connection = getConnection()

    const userRepository = getRepository(User)
    const examRepository = getRepository(Exam)
    const sectionRepository = getRepository(Section)
    const questionRepository = getRepository(Question)
    const answerRepository = getRepository(Answer)

    return connection.dropDatabase()
        .then(() => connection.synchronize())
        .then(() => userRepository.save(testUsers))
        .then(() => {

            return examRepository.find()
                .then(items => res.json(items))
                .catch(err => res.status(500).json({ error: err.message }))

        })

}
