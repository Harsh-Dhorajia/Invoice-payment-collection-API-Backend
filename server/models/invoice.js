module.exports = (sequelize, DataTypes) => {
  const Invoice = sequelize.define(
    "Invoice",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      receiverId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      payerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      paymentMode: {
        type: DataTypes.STRING,
        validate: {
          customValidator: (value) => {
            const enums = ["offline", "online"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        validate: {
          customValidator: (value) => {
            const enums = ["pending", "paid", "overdue"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
        allowNull: false,
        defaultValue: "pending"
      },
    },
    { timestamps: true, freezeTableName: true, }
  );

  Invoice.associate = (models) => {
    // Define associations
    Invoice.belongsTo(models.User, { foreignKey: "receiverId" }); // Invoice belongs to a receiver
    Invoice.belongsTo(models.User, { foreignKey: "payerId" }); // Invoice belongs to a payer
  };
  return Invoice;
};
