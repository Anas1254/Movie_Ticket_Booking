module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define("movie", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    movieName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    movieGenre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    poster: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Movie;
};
