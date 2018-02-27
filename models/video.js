'use strict';
module.exports = (sequelize, DataTypes) => {
  var video = sequelize.define('video', {
    courseName: DataTypes.STRING,
    tag: DataTypes.STRING,
    courseDescription: DataTypes.STRING,
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    UserId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'teachers',
          key: 'id'
        }
      },
  }, {
    classMethods: {
      associate: function(models) {
        video.belongsTo(models.teacher, {
          foreignKey: 'UserId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return video;
};
