'use strict';
module.exports = (sequelize, DataTypes) => {
  const detail = sequelize.define('detail', {
    page: DataTypes.INTEGER,
    image: DataTypes.STRING,
    episode_id: DataTypes.INTEGER
  }, {});
  detail.associate = function(models) {
    // associations can be defined here
    detail.belongsTo(models.episode,{
      as: "Episode",
      foreignKey: 'episode_id',
    })
  };
  return detail;
};