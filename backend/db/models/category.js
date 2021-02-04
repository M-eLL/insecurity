"use strict";
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    "Category",
    {
      type: DataTypes.STRING,
    },
    {}
  );
  Category.associate = function (models) {
    // associations can be defined here
    // has many entries

    Category.hasMany(models.Entry, { foreignKey: "categoryId" });
  };
  return Category;
};
