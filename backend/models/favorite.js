'use strict';
module.exports = (sequelize, DataTypes) => {
  const favorite = sequelize.define('favorite', {
    user_id: DataTypes.INTEGER,
    webtoon_id: DataTypes.INTEGER
  }, {});
  favorite.associate = function(models) {
    // associations can be defined here
    favorite.belongsTo(models.user, {
      as: 'User',
      foreignKey: 'user_id',
    })
    favorite.belongsTo(models.webtoon, {
      as: 'Webtoon',
      foreignKey: 'webtoon_id',
    })
  };
  return favorite;
};