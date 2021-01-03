import { compare } from 'bcryptjs'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import * as User from '../controller/user'
import { log } from './logger'


const userCheckFail = (text, done) => {

    log.error(text)
    return done(null, false)

}

const checkPassword = (password, user: User.UserType, done) => {

    const { login, hash } = user

    return compare(password, hash)
        .then(res => {

            if (!res)
                return userCheckFail(`check password fail for user: ${ login }`, done)

            log.info(`check password success for user: ${ login }`)
            done(null, user)

        })

}

const localStrategyOptions = { usernameField: 'login' }
const localStrategyVerify = (login, password, done) => {

    User.findOne({ login })
        .then(user => {

            if (!user)
                return userCheckFail(`no such user with login: ${ login }`, done)

            return checkPassword(password, user, done)

        })
        .catch(err => done(err, false))

}

passport.use(new LocalStrategy(localStrategyOptions, localStrategyVerify))

const serializeUser = (user: User.UserType, done) => {
    done(null, user.id)
}

function deserializeUser(id, done) {

    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, false))

}

passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)

export default passport
