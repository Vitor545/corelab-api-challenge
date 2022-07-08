import { DataTypes, Model } from 'sequelize'
import db from '.'

class AnnouncementModel extends Model {}

AnnouncementModel.init(
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
    brand: {
      type: DataTypes.STRING,
      allowNull: false
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false
    },
    board: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    priceMax: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    priceMin: {
      type: DataTypes.NUMBER,
      allowNull: false
    },
    userId: {
      allowNull: false,
      references: {
        model: 'UserModel',
        key: 'id'
      },
      type: DataTypes.NUMBER,
      onDelete: 'CASCADE'
    }
  },
  {
    modelName: 'AnnouncementModel',
    sequelize: db,
    tableName: 'announcements'
  }
)
export default AnnouncementModel
