import UsersModel from '../../database/models/UserModel'

export const userMock = {
  id: 1,
  name: 'John Doe',
  email: 'gtadobairro345@gmail.com',
  password: '$2a$10$0loWus9uQvLYHwTblFO1meqGONOmWA8kaaWUoa/.moX60O0BNji3.'
} as UsersModel

export const userBody = {
  OK: {
    email: 'gtadobairro345@gmail.com',
    password: 'Pizza3025$'
  },
  wrongPassword: {
    email: 'gtadobairro345@gmail.com',
    password: 'Astronaut2021$'
  },
  wrongEmail: {
    email: 'gtadobairro@gmail.com',
    password: 'Pizza3025$'
  },
  withoutPassword: {
    email: 'gtadobairro345@gmail.com',
    password: ''
  },
  withoutEmail: {
    email: '',
    password: 'Pizza3025$'
  }
}
