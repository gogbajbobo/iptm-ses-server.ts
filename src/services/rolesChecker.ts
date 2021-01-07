import { Request, Response, NextFunction } from 'express'
import { UserRole, User } from '../entity/User'
import { RouteActionResponse } from '../routes/interfaces'


export const requireRoles = (roles: UserRole[]) => {

    return (req: Request, res: Response, next: NextFunction): RouteActionResponse => {

        const user: User = req.user as User

        if (!user)
            return res.status(401).send('Unauthorized')

        const checkRole = (role: UserRole) => { return roles.includes(role) }

        return user.roles.some(checkRole)
            ? next()
            : res.status(403).send('Forbidden').end()

    }

}
