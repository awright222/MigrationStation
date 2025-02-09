'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically. a
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE'
      })
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Booking',
    tableName: 'Bookings'
    // defaultScope: {
    //   attributes: {
    //     exclude: ['createdAt', 'updatedAt']
    //   }
    // }
  });
  return Booking;
};