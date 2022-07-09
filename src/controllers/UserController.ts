import { NextFunction, Request, Response } from 'express'
import ErrorHandler from '../helpers/ErrorHandler'
import UserService from '../services/UserServices'

export default class UserController {
  private _userService = new UserService()

  public async createUser (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { name, email, password } = req.body
      if (!email || !password || !name) {
        throw new ErrorHandler('Preencha todos os campos', 400)
      }
      const user = await this._userService.create(name, email, password)

      return res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  }
}