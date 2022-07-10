import AnnouncementModel from '../database/models/AnnouncementModel'
import ErrorHandler from '../helpers/ErrorHandler'
import { IAnnouncement } from '../interfaces/announcement.interface'
import * as JWT from '../helpers/JWT'

export default class UserServices {
  private _announcementModel = AnnouncementModel

  private jwt = JWT

  async getAllAnnouncement (token: string | undefined) {
    this.jwt.verify(token)
    const announcementModel: IAnnouncement[] = await this._announcementModel.findAll()
    return announcementModel
  }

  async getByid (id: number, token: string | undefined) {
    this.jwt.verify(token)
    const announcementModel: IAnnouncement | null = await this._announcementModel.findOne({ where: { id } })

    if (!announcementModel) throw new ErrorHandler('Anuncio não encontrado', 401)

    return announcementModel
  }

  async create (info: IAnnouncement, token: string | undefined) {
    this.jwt.verify(token)
    const { name, brand, color, board, year, description, priceMin, priceMax, userId } = info
    if (year < 0 || year > 2022) throw new ErrorHandler('Ano inválido', 401)
    if (description.length > 255 || name.length > 255 || board.length > 255 || brand.length > 255) throw new ErrorHandler('Máximo de 255 caracteres', 401)
    if (priceMin < 0 || priceMax > 10000000000) throw new ErrorHandler('Máximo de R$10000000000 e Mínimo de 0', 401)
    const announcementModel: IAnnouncement = await this._announcementModel.create({ name, brand, color, board, year, description, priceMin, priceMax, userId })
    return announcementModel
  }

  async update (info: IAnnouncement, token: string | undefined, id: number) {
    this.jwt.verify(token)
    const { name, brand, color, board, year, description, priceMin, priceMax, userId } = info
    if (Number(year) < 0 || Number(year) > 2022) throw new ErrorHandler('Ano inválido', 401)
    if (description.length > 255 || name.length > 255 || board.length > 255 || brand.length > 255) throw new ErrorHandler('Máximo de 255 caracteres', 401)
    if (Number(priceMin) < 0 || Number(priceMax) > 10000000000) throw new ErrorHandler('Máximo de R$10000000000 e Mínimo de 0', 401)
    const userVerify: IAnnouncement | null = await this._announcementModel.findOne({ where: { id } })
    if (!userVerify) throw new ErrorHandler('Anúncio não encontrado', 401)
    if (userVerify.userId !== userId) throw new ErrorHandler('Anúncio não te pertece, não pode altera-lo', 401)
    const announcementModel = await this._announcementModel.update({ name, brand, color, board, year, description, priceMin, priceMax, userId }, { where: { id } })
    return announcementModel
  }

  async delete (userId: number, token: string | undefined, id: number) {
    this.jwt.verify(token)
    const userVerify: IAnnouncement | null = await this._announcementModel.findOne({ where: { id } })
    if (!userVerify) throw new ErrorHandler('Anúncio não encontrado', 401)
    if (userVerify.userId !== userId) throw new ErrorHandler('Anúncio não te pertece, não pode deleta-lo', 401)
    const announcementModel = await this._announcementModel.destroy({ where: { id } })
    return announcementModel
  }
}
