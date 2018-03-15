const bcrypt = require('bcrypt')


'use strict';
module.exports = (sequelize, DataTypes) => {
  var students = sequelize.define('students', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    field: DataTypes.STRING,
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  },
  {
  hooks: {
  afterValidate: async students => {
    const hashedPassword = await bcrypt.hash(students.password, 12);
    students.password = hashedPassword;
  }
}
},
   {
    classMethods: {
      associate: function(models) {
        students.belongsTo(models.videos, {
            foreignKey: 'videoId',
            onDelete: 'CASCADE'
          });
      }
    }
  });
  return students;
};
