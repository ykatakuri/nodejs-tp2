import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  dialect: 'mysql',
  host: 'mysql-matches.alwaysdata.net',
  port: 3306,
  database: 'matches_db',
  username: 'matches_user',
  password: '.SYAEjWX5Csf38p'
});

sequelize.authenticate()
  .then(() => console.log('Connection to database OK'))
  .then(() => sequelize.sync({ alter: true }))
  .then(() => console.log('Database sync OK'))
  .catch(error => console.error('Connection to database KO', error));

