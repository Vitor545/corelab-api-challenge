import * as bcrypt from 'bcryptjs'
import ErrorHandler from '../helpers/ErrorHandler'
import UsersModel from '../database/models/UserModel'
import * as JWT from '../helpers/JWT'
import { IUser } from '../interfaces/user.interface'

export default class LoginService {
  private usersModel = UsersModel
  private jwt = JWT

  async login (email: string, password: string) {
    const userModel: IUser | null = await this.usersModel.findOne({ where: { email } })

    if (!userModel) throw new ErrorHandler('Email ou senha estão incorretos', 401)

    // hasUser por ser do tipo IUser pode ou não receber senha, então quado eu tenho a senha eu verifico se não passou se não responde 401
    if (userModel.password && !bcrypt.compareSync(password, userModel.password)) {
      throw new ErrorHandler('Email ou senha estão incorretos', 401)
    }

    // a Interface pode ou não receber uma senha por conta da constante abaixo, onde eu não quero enviar a senha com resposta.
    const user: IUser = {
      id: userModel.id,
      name: userModel.name,
      email: userModel.email
    }

    const token = this.jwt.create(user)

    return { user, token }
  }
}
