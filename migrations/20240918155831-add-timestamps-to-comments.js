'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adiciona os campos createdAt e updatedAt
    await queryInterface.addColumn('Comments', 'createdAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    });
    await queryInterface.addColumn('Comments', 'updatedAt', {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove os campos createdAt e updatedAt
    await queryInterface.removeColumn('Comments', 'createdAt');
    await queryInterface.removeColumn('Comments', 'updatedAt');
  }
};
