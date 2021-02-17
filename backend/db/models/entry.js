"use strict";
module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define(
    "Entry",
    {
      userId: DataTypes.INTEGER,
      locked: DataTypes.BOOLEAN,
      starred: DataTypes.BOOLEAN,
      date: DataTypes.DATEONLY,
      title: DataTypes.STRING,
      text: DataTypes.TEXT,
      categoryId: DataTypes.INTEGER,
      hashedPassword: DataTypes.STRING,
      imageLink: DataTypes.STRING,
    },
    {}
  );
  Entry.associate = function (models) {
    // associations can be defined here
    Entry.belongsTo(models.User, { foreignKey: "userId" });
    Entry.belongsTo(models.Category, { foreignKey: "categoryId" });
  };
  return Entry;
};
