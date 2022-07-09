import { DataTypes, Model } from 'sequelize'
import db from '.'
import AnnouncementModel from './AnnouncementModel'

class UserModel extends Model {
  declare id: number
  declare name: string
  declare email: string
  declare password: string
}

UserModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    modelName: 'UserModel',
    sequelize: db,
    tableName: 'users'
  }
)
UserModel.hasMany(AnnouncementModel, { foreignKey: 'userId', as: 'user' })

export default UserModel
