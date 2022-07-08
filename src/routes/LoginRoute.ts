import * as express from 'express'
import LoginController from '../controllers/LoginController'

export default class LoginRoute {
  private _route:express.Router
  private _loginController: LoginController

  constructor () {
    this._route = express.Router()
    this._loginController = new LoginController()
    this.init()
  }

  get route ():express.Router {
    return this._route
  }

  private init () {
    const controller = this._loginController
    this._route.post('/', controller.login.bind(controller))
  }
}
