'use strict';
module.exports = (sequelize, DataTypes) => {
  var teacher = sequelize.define('teacher', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    bio: DataTypes.STRING,
    field: DataTypes.STRING,
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {
    classMethods: {
      associate: function(models) {
        teacher.hasMany(models.video, {
          foreignKey: 'UserId',
	      onDelete: 'CASCADE'
        });
      }
    }
  });
  return teacher;
};
