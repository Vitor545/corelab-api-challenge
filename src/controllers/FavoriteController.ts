import { NextFunction, Request, Response } from 'express'
import ErrorHandler from '../helpers/ErrorHandler'
import FavoriteServices from '../services/FavoriteServices'

export default class FavoriteController {
  private _favoriteService = new FavoriteServices()

  public async getAllFavorites (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const token = req.headers.authorization
      const { userId } = req.params
      if (!userId) throw new ErrorHandler('Usuário não foi passado', 400)
      const announcement = await this._favoriteService.getAllFavoriteUser(Number(userId), token)
      return res.status(200).json(announcement)
    } catch (err) {
      next(err)
    }
  }

  public async createFavorite (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const token = req.headers.authorization
      const { userId, announcementId } = req.body
      if (!userId) throw new ErrorHandler('Usuário não foi passado', 400)
      if (!announcementId) throw new ErrorHandler('Anúncio não foi passado', 400)
      const announcement = await this._favoriteService.create({ userId, announcementId }, token)
      return res.status(200).json(announcement)
    } catch (err) {
      next(err)
    }
  }

  public async deleteFavorite (req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const token = req.headers.authorization
      const { announcementId } = req.params
      const { userId } = req.body
      if (!userId) throw new ErrorHandler('Usuário não foi passado', 400)
      if (!announcementId) throw new ErrorHandler('Anúncio não foi passado', 400)
      await this._favoriteService.delete(userId, Number(announcementId), token)
      return res.status(200).end
    } catch (err) {
      next(err)
    }
  }
}
