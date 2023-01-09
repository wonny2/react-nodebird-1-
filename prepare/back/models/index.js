const Sequelize = require('sequelize');

            // env = 개발모드상태라는 것
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {}

const sequelize = new Sequelize(config.database, config.username, config.password, config);
// 이렇게 되면 sequelize가 node랑 mysql를 연결해준다.
// 연결이 성공하면 sequelize에 정보가 담긴다.



Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
