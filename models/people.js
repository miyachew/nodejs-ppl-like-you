'use strict';
module.exports = (sequelize, DataTypes) => {
  const People = sequelize.define('peoples', {
    name: DataTypes.STRING,
    age: DataTypes.INTEGER.UNSIGNED,
    latitude: DataTypes.DECIMAL(16, 8),
    longitude: DataTypes.DECIMAL(16, 8),
    monthlyIncome: DataTypes.INTEGER.UNSIGNED,
    experienced: DataTypes.TINYINT.UNSIGNED
  }, {});

  People.associate = function(models) {
    // associations can be defined here
  };
  return People;
};