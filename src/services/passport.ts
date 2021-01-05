import { compare } from 'bcryptjs'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import * as User from '../controller/user'
import { log } from './logger'
import config from './config'
import { checkJwtPayload } from './token'


const userCheckFail = (text, done) => {

    log.error(text)
    return done(null, false)

}

const checkPassword = (password, user: User.UserType, done) => {

    const { id, username, hash } = user
    const safeUser = { id, username }

    return compare(password, hash)
        .then(res => {

            if (!res)
                return userCheckFail(`check password fail for user: ${ username }`, done)

            log.info(`check password success for user: ${ username }`)
            done(null, safeUser)

        })

}

const localStrategyOptions = { usernameField: 'username' }
const localStrategyCallback = (username, password, done) => {

    User.findOne({ username })
        .then(user => {

            if (!user)
                return userCheckFail(`no such user with username: ${ username }`, done)

            return checkPassword(password, user, done)

        })
        .catch(err => done(err, false))

}

passport.use(new LocalStrategy(localStrategyOptions, localStrategyCallback))

const jwtStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('jwt:secretKey'),
    passReqToCallback: true
}
const jwtStrategyCallback = (req, jwtPayload, done) => {

    checkJwtPayload(jwtPayload, err => {

        if (err) {

            const text = `checkJwtPayload error: ${ err.message }`
            log.error(text)

            return done(null, false)

        }

        User.findById(jwtPayload.id)
            .then(user => done(null, user))
            .catch(err => done(err, false))

    })

}

passport.use(new JwtStrategy(jwtStrategyOptions, jwtStrategyCallback))

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
