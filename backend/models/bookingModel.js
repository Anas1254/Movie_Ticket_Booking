module.exports = (sequelize, DataTypes) => {
  const booking = sequelize.define("booking", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payableAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return booking;
};
