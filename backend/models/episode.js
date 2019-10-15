'use strict';
module.exports = (sequelize, DataTypes) => {
  const episode = sequelize.define('episode', {
    title: DataTypes.STRING,
    cover: DataTypes.STRING,
    webtoon_id: DataTypes.INTEGER
  }, {});
  episode.associate = function(models) {
    // associations can be defined here
    episode.belongsTo(models.webtoon,{
      as: "Webtoon",
      foreignKey: 'webtoon_id',
    })
  };
  return episode;
};