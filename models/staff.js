module.exports = (sequelize, DataTypes) => {
    const staff = sequelize.define("staff", {
      enroll: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return staff;
  };
  