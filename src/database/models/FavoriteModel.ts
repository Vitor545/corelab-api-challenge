import { DataTypes, Model } from 'sequelize'
import db from '.'
import AnnouncementModel from './AnnouncementModel'
import UserModel from './UserModel'

class FavoriteModel extends Model {
  declare id: number
  declare userId: number
  declare announcementId: number
}

FavoriteModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'UserModel'
      },
      onDelete: 'CASCADE',
      allowNull: false
    },
    announcementId: {
      type: DataTypes.INTEGER,
      references: {
        key: 'id',
        model: 'AnnouncementModel'
      },
      onDelete: 'CASCADE',
      allowNull: false
    }
  },
  {
    modelName: 'FavoriteModel',
    sequelize: db,
    tableName: 'favorites'
  }
)

AnnouncementModel.belongsToMany(UserModel, { foreignKey: 'announcementId', through: FavoriteModel, as: 'favoritos' })
UserModel.belongsToMany(AnnouncementModel, { foreignKey: 'userId', through: FavoriteModel, as: 'favoritos' })
export default FavoriteModel
