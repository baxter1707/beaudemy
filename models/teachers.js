const bcrypt = require('bcrypt')


'use strict';
module.exports = (sequelize, DataTypes) => {
  var teachers = sequelize.define('teachers', {
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
    user_name: DataTypes.TEXT,
    password: DataTypes.TEXT

  },
  {
  hooks: {
  afterValidate: async teachers => {
    const hashedPassword = await bcrypt.hash(teachers.password, 12);
    teachers.password = hashedPassword;
  }
}
},
  {
    classMethods: {
      associate: function(models) {
        teachers.hasMany(models.videos, {
            foreignKey: 'teacherId',
  	      onDelete: 'CASCADE'
          });
      }
    }
  },);
  return teachers;
};
