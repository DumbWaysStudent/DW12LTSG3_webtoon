'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('episodes', [
        {
          title: 'Episode 1',
          cover: 'https://swebtoon-phinf.pstatic.net/20190411_172/1554962988924EKc7P_JPEG/thumb_M.jpg',
          webtoon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Episode 2',
          cover: 'https://swebtoon-phinf.pstatic.net/20190411_172/1554962988924EKc7P_JPEG/thumb_M.jpg',
          webtoon_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Episode 1',
          cover: 'https://swebtoon-phinf.pstatic.net/20190411_172/1554962988924EKc7P_JPEG/thumb_M.jpg',
          webtoon_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('episodes', null, {});
  }
};
