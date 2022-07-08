import * as express from 'express'
import FavoriteRoute from './FavoriteRoute'
import LoginRoute from './LoginRoute'
import UserRoute from './UserRoute'
import AnnouncementRoute from './AnnouncementRoute'

export default class {
  private _router: express.Router
  private _loginRouter: LoginRoute
  private _userRouter: UserRoute
  private _announcementRouter: AnnouncementRoute
  private _favoriteRouter: FavoriteRoute

  constructor () {
    this._router = express.Router()

    this._loginRouter = new LoginRoute()
    this._userRouter = new UserRoute()
    this._announcementRouter = new AnnouncementRoute()
    this._favoriteRouter = new FavoriteRoute()

    this.init()
  }

  get router ():express.Router {
    return this._router
  }

  private init () {
    this._router.use('/login', this._loginRouter.route)
    this._router.use('/users', this._userRouter.route)
    this._router.use('/announcement', this._announcementRouter.route)
    this._router.use('/favorites', this._favoriteRouter.route)
  }
}
