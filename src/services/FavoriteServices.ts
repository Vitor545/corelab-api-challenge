import FavoriteModel from '../database/models/FavoriteModel'
import ErrorHandler from '../helpers/ErrorHandler'
import { IFavorite } from '../interfaces/favorite.interface'
import * as JWT from '../helpers/JWT'

export default class UserServices {
  private _favoriteModel = FavoriteModel
  private jwt = JWT

  async getAllFavoriteUser (userId: number, token: string | undefined) {
    this.jwt.verify(token)
    const idVerify: IFavorite | null = await this._favoriteModel.findOne({ where: { userId } })
    if (!idVerify) throw new ErrorHandler('Usuário sem favoritos', 401)
    return idVerify
  }

  async create (info: IFavorite, token: string | undefined) {
    this.jwt.verify(token)
    const { userId, announcementId } = info
    const idVerify: IFavorite | null = await this._favoriteModel.findOne({ where: { userId, announcementId } })
    if (idVerify) throw new ErrorHandler('Favorito já existe', 401)
    const announcementModel: IFavorite = await this._favoriteModel.create({ userId, announcementId })
    return announcementModel
  }

  async delete (userId: number, announcementId: number, token: string | undefined) {
    this.jwt.verify(token)
    const idVerify: IFavorite | null = await this._favoriteModel.findOne({ where: { userId, announcementId } })
    if (!idVerify) throw new ErrorHandler('Favorito não existe', 401)
    await this._favoriteModel.destroy({ where: { userId, announcementId } })
  }
}
