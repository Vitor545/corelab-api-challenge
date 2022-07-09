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

  async create (info: IAnnouncement, token: string | undefined) {
    this.jwt.verify(token)
    const { name, brand, color, board, year, description, priceMin, priceMax, userId } = info
    const announcementModel: IAnnouncement = await this._announcementModel.create({ name, brand, color, board, year, description, priceMin, priceMax, userId })
    return announcementModel
  }

  async update (info: IAnnouncement, token: string | undefined, id: number) {
    this.jwt.verify(token)
    const { name, brand, color, board, year, description, priceMin, priceMax, userId } = info
    const idVerify: IAnnouncement | null = await this._announcementModel.findOne({ where: { id } })
    if (!idVerify) throw new ErrorHandler('Anúncio não existe', 401)
    const announcementModel = await this._announcementModel.update({ name, brand, color, board, year, description, priceMin, priceMax, userId }, { where: { id } })
    return announcementModel
  }
}
