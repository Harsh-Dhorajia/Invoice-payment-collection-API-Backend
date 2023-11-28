module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      roleType: {
        type: DataTypes.STRING,
        validate: {
          customValidator: (value) => {
            const enums = ["receiver", "payer", "admin"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
      },
    },
    { timestamps: true, freezeTableName: true, }
  );

  // Defined associations
  User.associate = (models) => {
    User.hasMany(models.Invoice, { foreignKey: "receiverId" }); // Receiver can have many invoices
    User.hasMany(models.Invoice, { foreignKey: "payerId" }); // Payer can have many invoices
  };
  return User;
};
