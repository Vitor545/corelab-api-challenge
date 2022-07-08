import * as express from 'express'
import FavoriteController from '../controllers/FavoriteController'

export default class FavoriteRoute {
  private _route:express.Router
  private _favoriteController: FavoriteController

  constructor () {
    this._route = express.Router()
    this._favoriteController = new FavoriteController()
    this.init()
  }

  get route ():express.Router {
    return this._route
  }

  private init () {
    const controller = this._favoriteController
    this._route.get('/', controller.getAllFavorites.bind(controller))
    this._route.get('/:id', controller.getFavoriteById.bind(controller))
    this._route.post('/', controller.createFavorite.bind(controller))
    this._route.delete('/:id', controller.deleteFavorite.bind(controller))
  }
}
