import AnnouncementModel from '../database/models/AnnouncementModel'
import ErrorHandler from '../helpers/ErrorHandler'
import { IAnnouncement } from '../interfaces/announcement.interface'
import * as JWT from '../helpers/JWT'

export default class UserServices {
  private _announcementModel = AnnouncementModel
  private jwt = JWT

  async create (info: IAnnouncement, token: string | undefined) {
    this.jwt.verify(token)
    const { board } = info

    const boardVerify: IAnnouncement | null = await this._announcementModel.findOne({ where: { board } })
    if (boardVerify) throw new ErrorHandler('Placa já cadastrada', 401)

    const announcementModel: IAnnouncement = await this._announcementModel.create({ info })

    return { announcementModel }
  }

  async update (info: IAnnouncement, token: string | undefined, id: number) {
    this.jwt.verify(token)
    const idVerify: IAnnouncement | null = await this._announcementModel.findOne({ where: { id } })
    if (!idVerify) throw new ErrorHandler('Anúncio não existe', 401)
    const announcementModel = await this._announcementModel.update({ info }, { where: { id } })
    return { announcementModel }
  }
}
