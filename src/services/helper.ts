import {User} from '../entity/User'
import {UserRole} from '../entity/UserRole'

export const isProduction = process.env.NODE_ENV === 'production'

export const isExaminee = (user: User): boolean => user.roles.includes(UserRole.EXAMINEE)
export const isExaminer = (user: User): boolean => user.roles.includes(UserRole.EXAMINER)
export const isAdmin = (user: User): boolean => user.roles.includes(UserRole.ADMIN)

export const arrayIntersect = (a1: unknown[], a2: unknown[]): unknown[] => a1.filter(v => a2.includes(v))
