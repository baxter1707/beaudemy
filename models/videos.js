'use strict';
module.exports = (sequelize, DataTypes) => {
  var videos = sequelize.define('videos', {
    courseName: DataTypes.STRING,
    tag: DataTypes.STRING,
    courseDescription: DataTypes.STRING,
    url: DataTypes.TEXT,
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    teacherId: {
        type: DataTypes.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'teachers',
          key: 'id'
        }
      },
    studentid: {
      type: DataTypes.TEXT
    },
    screenurl : {
      type: DataTypes.TEXT
    }
  }, {
    classMethods: {
      associate: function(models) {
        videos.hasMany(models.students, {
         foreignKey: 'videoId',
       onDelete: 'CASCADE'
       });
        videos.belongsTo(models.teachers, {
          foreignKey: 'teacherId',
          onDelete: 'CASCADE'
        });
      }
    }
  });
  return videos;
};
