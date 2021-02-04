"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Prompts",
      [
        {
          prompt: "Talk about your day",
        },
        {
          prompt: "Identify things you’re grateful for",
        },
        {
          prompt: "Write a list of your coping mechanisms",
        },
        {
          prompt: "Describe a goal",
        },
        {
          prompt: "Write about how different you were 5 years ago",
        },
        {
          prompt: "List and describe your emotions",
        },
        {
          prompt: "Write about how you'd describe yourself to a stranger",
        },
        {
          prompt: "Describe the best compliment you've ever gotten",
        },
        {
          prompt:
            "Identify one thing you are looking forward this week, and explain why it makes you feel excited.",
        },
        {
          prompt:
            "How do you want to feel tomorrow, and what 3 things can you do today to ensure you feel that way?",
        },
        {
          prompt:
            "Write down the things that trigger feelings of anxiety in you, and identify 1-3 strategies you can use to combat each of them",
        },
        {
          prompt:
            "Pick ONE positive word you’d like to focus on this week and brainstorm a list of things you can do to experience this feeling each day.",
        },
        {
          prompt:
            "Identify 3 things in your life that you SHOULD be grateful for, but aren’t. What emotions do these things evoke in you, and why aren’t you grateful for them?",
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
    return queryInterface.bulkDelete("Prompts", null, {});
  },
};
