import { Request, Response } from 'express'
import { FindManyOptions } from 'typeorm'

export const defaultFindOptions = (req: Request): FindManyOptions => {

    const options: FindManyOptions = req.body.options || {}

    if (!options.take) options.take = 100

    return options

}

type HandleErrorReturnType = (err: Error) => Response

export const handleError = (res: Response, code: number): HandleErrorReturnType => {
    return (err: Error): Response => res.status(code).json({ error: err.message })
}

export const clientError = (res: Response, code = 400): HandleErrorReturnType => handleError(res, code)

export const serverError = (res: Response, code = 500): HandleErrorReturnType => handleError(res, code)

export const rejectedClientError = (res: Response, errorMessage: string): Promise<Response> => {
    return Promise.reject(new Error(errorMessage)).catch(clientError(res))
}
