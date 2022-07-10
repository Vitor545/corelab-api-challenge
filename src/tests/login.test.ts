import * as sinon from 'sinon'
import * as chai from 'chai'
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app'

import { Response } from 'superagent'
import UsersModel from '../database/models/UserModel'
import { userBody, userMock } from './mocks/user.mock'

chai.use(chaiHttp)

const { expect } = chai

let chaiHttpResponse: Response

describe('/login', () => {
  it('Quando passar o login corretamente retorna o esperado', async () => {
    sinon.stub(UsersModel, 'findOne').resolves(userMock)
    chaiHttpResponse = await chai.request(app).post('/login').send(userBody.OK);
    (UsersModel.findOne as sinon.SinonStub).restore()

    const userMockProps = {
      id: userMock.id,
      name: userMock.name,
      email: userMock.email
    }
    expect(chaiHttpResponse.status).to.be.equal(200)

    expect(chaiHttpResponse.body.user).to.be.deep.equal(
      userMockProps
    )    
    expect(chaiHttpResponse.body.token).to.haveOwnProperty
  })
  it('Quando passar a senha errada retorna 401 é messagem "Email ou senha estão incorretos"', async () => {
    sinon.stub(UsersModel, 'findOne').resolves(userMock);
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userBody.wrongPassword);
    (UsersModel.findOne as sinon.SinonStub).restore();

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal(
      'Email ou senha estão incorretos',
    );
  });

  it('Quando passar email errado retorna 401 é messagem "Email ou senha estão incorretos"', async () => {
    sinon.stub(UsersModel, 'findOne').resolves(null);
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userBody.wrongEmail);
    (UsersModel.findOne as sinon.SinonStub).restore();

    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body.message).to.be.equal(
      'Email ou senha estão incorretos',
    );
  });

  it('Quando não passar o email retorna 400 é messagem "Preencha todos os campos"', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userBody.withoutEmail);

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal(
      'Preencha todos os campos',
    );
  });

  it('Quando não passar a senha retorna 400 é messagem "Preencha todos os campos"', async () => {
    chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .send(userBody.withoutPassword);

    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body.message).to.be.equal(
      'Preencha todos os campos',
    );
  });
})
