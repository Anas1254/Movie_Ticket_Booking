const onGoingModel = require("./bookingModel");

module.exports = (sequelize, DataTypes) => {
  const onGoing = sequelize.define("ongoing", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    movieTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    movieDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    costPerSeat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return onGoing;
};
