import { NextFunction, Request, Response } from 'express'
import ErrorHandler from '../helpers/ErrorHandler'
import LoginService from '../services/LoginServices'

export default class LoginController {
  private _loginService = new LoginService()

  public async login (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { email, password } = req.body
      if (!email || !password) {
        throw new ErrorHandler('Preencha todos os campos', 400)
      }
      const user = await this._loginService.login(email, password)

      return res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  }
}
