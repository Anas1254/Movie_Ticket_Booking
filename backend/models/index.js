const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: true,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.movies = require("./moviesModel.js")(sequelize, DataTypes);
db.onGoingMovies = require("./onGoingMoviesModel.js")(sequelize, DataTypes);
db.user = require("./userModel.js")(sequelize, DataTypes);
db.booking = require("./bookingModel.js")(sequelize, DataTypes);
//FK settings
db.movies.hasMany(db.onGoingMovies);
db.onGoingMovies.hasMany(db.booking);
db.user.hasMany(db.booking);
db.onGoingMovies.belongsTo(db.movies);
db.sequelize.sync({ force: false }).then(() => {
  console.log("yes sync is done");
});

module.exports = db;
