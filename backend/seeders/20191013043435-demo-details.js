'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('details', [
        {
          page: 1,
          image: 'https://webtoon-phinf.pstatic.net/20191002_249/1570025986555hX11u_JPEG/15700259865381647346.jpg?type=q90',
          episode_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page: 2,
          image: 'https://webtoon-phinf.pstatic.net/20191002_39/1570025989324jWUSP_JPEG/15700259892921647345.jpg?type=q90',
          episode_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          page:1,
          image: 'https://webtoon-phinf.pstatic.net/20191002_249/1570025986555hX11u_JPEG/15700259865381647346.jpg?type=q90',
          episode_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('details', null, {});
  }
};
