import * as sinon from 'sinon'
import * as chai from 'chai'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'

import { Response } from 'superagent'
import FavoriteModel from '../database/models/FavoriteModel'
import UserModel from '../database/models/UserModel'
import { favoriteMock } from './mocks/favorite.mock'
import { userBody, userMock } from './mocks/user.mock'


chai.use(chaiHttp)

const { expect } = chai

let chaiHttpResponse: Response

describe('/favorites', () => {
  it('Quando passar os dados corretos retorna o esperado', async () => {

    sinon.stub(UserModel, 'findOne').resolves(userMock);
    const {body: { token }} = await chai.request(app).post('/login').send(userBody.OK);
    (UserModel.findOne as sinon.SinonStub).restore();
    
    sinon.stub(FavoriteModel, 'findAll').resolves(favoriteMock as any)
    chaiHttpResponse = await chai.request(app).get('/favorites/1').set({ authorization: token });
    (FavoriteModel.findAll as sinon.SinonStub).restore()

    expect(chaiHttpResponse.body).to.deep.equal(
      favoriteMock
    ) 

    expect(chaiHttpResponse.status).to.be.equal(200)
   
  })
  it('Quando não passar o token retorna "Token not found"', async () => {

    
    sinon.stub(FavoriteModel, 'findAll').resolves(favoriteMock as any)
    chaiHttpResponse = await chai.request(app).get('/favorites/2');
    (FavoriteModel.findAll as sinon.SinonStub).restore()

    expect(chaiHttpResponse.body).to.deep.equal(
      {message: 'Token not found'}
    ) 

    expect(chaiHttpResponse.status).to.be.equal(401)
   
  })
  it('Quando o token for inválido retorna "Expired or invalid token"', async () => {

    sinon.stub(UserModel, 'findOne').resolves(userMock);
    const {body: { token }} = await chai.request(app).post('/login').send(userBody.OK);
    (UserModel.findOne as sinon.SinonStub).restore();
    
    sinon.stub(FavoriteModel, 'findAll').resolves(favoriteMock as any)
    chaiHttpResponse = await chai.request(app).get('/favorites/1').set({ authorization: 'inválido' });
    (FavoriteModel.findAll as sinon.SinonStub).restore()

    expect(chaiHttpResponse.body).to.deep.equal(
      { message: 'Expired or invalid token' }
    ) 

    expect(chaiHttpResponse.status).to.be.equal(401)
   
  })

})
