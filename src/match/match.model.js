import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../common/orm.config.js';

export class MatchModel extends Model {}
MatchModel.init({
  team1: DataTypes.STRING,
  team2: DataTypes.STRING,
  score: DataTypes.INTEGER,
  date: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  }
}, { sequelize, modelName: 'match' });
