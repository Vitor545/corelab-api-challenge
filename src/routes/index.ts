import * as express from 'express'
import FavoritesRoute from './FavoritesRoute'
import LoginRoute from './LoginRoute'
import UsersRoute from './UsersRoute'
import AnnouncementRoute from './AnnouncementRoute'

export default class {
  private _router: express.Router
  private _loginRouter: LoginRoute
  private _userRouter: UsersRoute
  private _announcementRouter: AnnouncementRoute
  private _favoritesRouter: FavoritesRoute

  constructor () {
    this._router = express.Router()

    this._loginRouter = new LoginRoute()
    this._userRouter = new UsersRoute()
    this._announcementRouter = new AnnouncementRoute()
    this._favoritesRouter = new FavoritesRoute()

    this.init()
  }

  get router ():express.Router {
    return this._router
  }

  private init () {
    this._router.use('/login', this._loginRouter.router)
    this._router.use('/users', this._userRouter.router)
    this._router.use('/announcement', this._announcementRouter.router)
    this._router.use('/favorites', this._favoritesRouter.router)
  }
}
