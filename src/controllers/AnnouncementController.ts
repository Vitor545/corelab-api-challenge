import { NextFunction, Request, Response } from 'express'
import ErrorHandler from '../helpers/ErrorHandler'
import AnnountcementServices from '../services/AnnountcementServices'

export default class AnnouncementController {
  private _annountcementServices = new AnnountcementServices()

  public async getAllAnnouncement (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const token = req.headers.authorization
      const announcement = await this._annountcementServices.getAllAnnouncement(token)
      return res.status(200).json(announcement)
    } catch (err) {
      next(err)
    }
  }

  public async getAnnouncementByID (req: Request, res: Response, next: NextFunction): Promise<any> {

  }

  public async createAnnouncement (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const token = req.headers.authorization
      const { name, brand, color, board, year, description, priceMin, priceMax, userId } = req.body
      if (!name || !brand || !color || !board || !year || !description || !priceMin || !priceMax) {
        throw new ErrorHandler('Preencha todos os campos', 400)
      }
      if (!userId) throw new ErrorHandler('Usuário não encontrado', 400)
      const announcement = await this._annountcementServices.create({ name, brand, color, board, year, description, priceMin, priceMax, userId }, token)
      return res.status(200).json(announcement)
    } catch (err) {
      next(err)
    }
  }

  public async updateAnnouncement (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const token = req.headers.authorization
      const { id } = req.params
      const { name, brand, color, board, year, description, priceMin, priceMax, userId } = req.body
      if (!name || !brand || !color || !board || !year || !description || !priceMin || !priceMax) {
        throw new ErrorHandler('Preencha todos os campos', 400)
      }
      if (!userId) throw new ErrorHandler('Usuário não encontrado', 400)
      if (!id) throw new ErrorHandler('Anúncio não encontrado', 400)
      const announcement = await this._annountcementServices.update({ name, brand, color, board, year, description, priceMin, priceMax, userId }, token, Number(id))

      return res.status(200).json(announcement)
    } catch (err) {
      next(err)
    }
  }

  public async deleteAnnouncement (req: Request, res: Response, next: NextFunction): Promise<any> {

  }
}
