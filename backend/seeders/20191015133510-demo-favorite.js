'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('favorites', [{
        user_id: 1,
        webtoon_id: 2
      },
      {
        user_id: 1,
        webtoon_id: 2
      },
      {
        user_id: 2,
        webtoon_id: 1
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('favorites', null, {});
  }
};
