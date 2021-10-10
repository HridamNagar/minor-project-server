module.exports = (sequelize, DataTypes) => {
  const students = sequelize.define("students", {
    enroll: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return students;
};
