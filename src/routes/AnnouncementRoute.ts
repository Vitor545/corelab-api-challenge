import * as express from 'express'
import AnnouncementController from '../controllers/AnnouncementController'

export default class AnnouncementRoute {
  private _route:express.Router
  private _announcementController: AnnouncementController

  constructor () {
    this._route = express.Router()
    this._announcementController = new AnnouncementController()
    this.init()
  }

  get route ():express.Router {
    return this._route
  }

  private init () {
    const controller = this._announcementController
    this._route.get('/', controller.getAllAnnouncement.bind(controller))
    this._route.get('/:id', controller.getAnnouncementByID.bind(controller))
    this._route.post('/', controller.createAnnouncement.bind(controller))
    this._route.patch('/:id', controller.updateAnnouncement.bind(controller))
    this._route.delete('/:id', controller.deleteAnnouncement.bind(controller))
  }
}
