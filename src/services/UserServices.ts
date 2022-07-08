import * as bcrypt from 'bcryptjs'
import UsersModel from '../database/models/UserModel'
import { passwordStrength } from 'check-password-strength'
import ErrorHandler from '../helpers/ErrorHandler'
import { IUser } from '../interfaces/user.interface'
import * as JWT from '../helpers/JWT'

import * as EmailValidator from 'email-validator'

export default class UserServices {
  private usersModel = UsersModel
  private jwt = JWT

  async create (name: string, email: string, password: string) {
    if (!EmailValidator.validate(email)) {
      throw new ErrorHandler('Formato de email incorreto', 401)
    }
    if (passwordStrength(password).value === 'Weak') {
      throw new ErrorHandler('Coloque uma senha mais forte', 401)
    }

    const userVerify: IUser | null = await this.usersModel.findOne({ where: { email } })

    if (userVerify) throw new ErrorHandler('Email já cadastrado', 401)
    password = bcrypt.hashSync(password, 10)

    const userModel: IUser | null = await this.usersModel.create({ name, email, password })

    const user: IUser = {
      id: userModel.id,
      name: userModel.name,
      email: userModel.email
    }

    const token = this.jwt.create(user)

    return { user, token }
  }
}
