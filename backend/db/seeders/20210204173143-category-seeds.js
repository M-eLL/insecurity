"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Categories",
      [
        {
          type: "Work",
        },
        {
          type: "School",
        },
        {
          type: "Relationships",
        },
        {
          type: "Other",
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Categories", null, {});
  },
};
