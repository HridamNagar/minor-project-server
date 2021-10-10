module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define("users", {
    enroll: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return users;
};
