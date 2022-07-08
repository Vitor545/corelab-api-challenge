import { DataTypes, Model } from 'sequelize'
import db from '.'

class FavoriteModel extends Model {}

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
export default FavoriteModel
