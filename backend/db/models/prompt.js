"use strict";
module.exports = (sequelize, DataTypes) => {
  const Prompt = sequelize.define(
    "Prompt",
    {
      prompt: DataTypes.STRING,
    },
    {}
  );
  Prompt.associate = function (models) {
    // associations can be defined here
    // has many entry foreign key prompt id
  };
  return Prompt;
};
