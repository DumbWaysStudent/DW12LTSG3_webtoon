'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('webtoons', [
        {
          title: 'Ucok Seorang Pelaut',
          genre: 'Romance',
          cover: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
          isFavorite: false,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Ucok Seorang Pelaut Remaster',
          genre: 'Romance',
          cover: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
          isFavorite: false,
          user_id: 1,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'Ucok Seorang Pedagang',
          genre: 'Romance',
          cover: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90',
          isFavorite: true,
          user_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('webtoons', null, {});
  }
};
