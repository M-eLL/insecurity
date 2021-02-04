"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Entries", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" },
      },
      locked: {
        type: Sequelize.BOOLEAN,
      },
      starred: {
        type: Sequelize.BOOLEAN,
      },
      date: {
        type: Sequelize.DATEONLY,
      },
      title: {
        type: Sequelize.STRING,
      },
      text: {
        type: Sequelize.TEXT,
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: { model: "Categories" },
      },
      promptId: {
        type: Sequelize.INTEGER,
        references: { model: "Prompts" },
      },
      hashedPassword: {
        type: Sequelize.STRING,
        unique: true,
      },
      imageLink: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Entries");
  },
};
``