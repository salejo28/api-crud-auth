import { Request, Response, NextFunction } from 'express'

export default {
    isLoggedIn (req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next()
        }
        return res.json({
            message: 'You are not authorized'
        })
    },

    isNotLoggedIn (req: Request, res: Response, next: NextFunction) {
        if (!req.isAuthenticated()) {
            return next()
        }
        return res.json({
            message: 'You are not authorized'
        })
    }
}