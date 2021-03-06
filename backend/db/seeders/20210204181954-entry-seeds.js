"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Entries",
      [
        {
          userId: 1,
          locked: false,
          starred: null,
          date: null,
          title: "Forgot the ranch for table 4",
          text:
            "5 years ago I forgot that table 4 requested an extra side of ranch. I still have nightmares about it.",
          categoryId: 1,
          hashedPassword: null,
          imageLink: null,
        },
        {
          userId: 1,
          locked: true,
          starred: null,
          date: null,
          title: "This entry is locked",
          text: "It shouldn't show up in main entries",
          categoryId: 1,
          hashedPassword: null,
          imageLink: null,
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
    return queryInterface.bulkDelete("Entries", null, {});
  },
};
