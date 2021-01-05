import { Request } from 'express'
import jwt from 'jsonwebtoken'
import config from '../services/config'
import { log } from './logger'

const tokenLifetime = 60 * 60 * 24 * 2

export const invokeToken = (req: Request, msg: string): Record<string,unknown> => {

    const
        { user } = req,
        now = Date.now(),
        expirationTime = Math.floor(now / 1000) + tokenLifetime,
        accessToken = jwt.sign(user, config.get('jwt:secretKey')),
        message = msg || 'Token invoked successfully'


    const text = `invokeToken ${ message }: ${ JSON.stringify(user, null, '\t') }`
    log.info(text)

    return {
        error: false,
        user,
        message,
        accessToken,
        expirationTime
    }

}


export const checkJwtPayload = (jwtPayload, callback) => {

    if (!jwtPayload)
        return callback(new Error('Unauthorized / Empty jwtPayload'))

    const { expirationTime, login } = jwtPayload

    const expirationDate = new Date(expirationTime * 1000)

    if (isNaN(Date.parse(expirationDate.toString())))
        return callback(new Error(`Invalid token expiration date for ${ login }`))

    if (expirationDate < new Date())
        return callback(new Error(`Token expire for ${ login }`))

    callback(null)

}
