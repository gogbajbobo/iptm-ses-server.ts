import { getRepository } from 'typeorm'
import { User } from '../entity/User'

export const findOne = (options: Record<string, string>): Promise<User> => {
    return getRepository(User).findOne(options)
}

export const findById = (id: number): Promise<User> => {
    return getRepository(User).findOne(id)
}
