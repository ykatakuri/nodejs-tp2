import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../common/orm.config.js';

export class UserModel extends Model {
}
UserModel.init({
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "contributor",
  },
}, { sequelize, modelName: 'user' });
