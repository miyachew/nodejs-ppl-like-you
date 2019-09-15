'use strict';
const fs = require('fs')
var results = JSON.parse(fs.readFileSync('./data/data.json', 'utf8'));

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('peoples', results, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('peoples', null, {});
  }
};
