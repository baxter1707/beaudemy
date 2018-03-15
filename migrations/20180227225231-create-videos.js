'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('videos', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      courseName: {
        type: Sequelize.STRING
      },
      tag: {
        type: Sequelize.STRING
      },
      url : {
        type: Sequelize.TEXT},
      courseDescription: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      teacherId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
          model: 'teachers',
          key: 'id'
        }
      },
      studentid: {
        type: Sequelize.TEXT,
        onDelete: 'CASCADE',
        references: {
          model: 'students',
          key: 'id'
        }
      }

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('videos');
  }
};
