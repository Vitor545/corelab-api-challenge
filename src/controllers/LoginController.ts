import { NextFunction, Request, Response } from 'express'
import ErrorHandler from '../helpers/ErrorHandler'

export default class LoginController {
  public async login (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        throw new ErrorHandler('All fields must be filled', 400)
      }
    } catch (err) {
      next(err)
    }
  }

  public async validate (req: Request, res: Response, next: NextFunction): Promise<any> {

  }
}
