'use strict';
module.exports = (sequelize, DataTypes) => {
  const webtoon = sequelize.define('webtoon', {
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    cover: DataTypes.STRING,
    isFavorite: DataTypes.BOOLEAN,
    user_id: DataTypes.INTEGER
  }, {});
  webtoon.associate = function(models) {
    // associations can be defined here
    webtoon.belongsTo(models.user, {
       as: 'createdBy',
       foreignKey: 'user_id',
     })
  };
  return webtoon;
};