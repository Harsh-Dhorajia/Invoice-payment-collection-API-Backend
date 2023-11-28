module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    "Transaction",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      invoiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Invoice",
          key: "id",
        },
      },
      amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      paymentGateway: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      transactionStatus: {
        type: DataTypes.STRING,
        validate: {
          customValidator: (value) => {
            const enums = ["success", "failed", "pending"];
            if (!enums.includes(value)) {
              throw new Error("not a valid option");
            }
          },
        },
        allowNull: false,
      },
    },
    { timestamps: true, freezeTableName: true, }
  );

  // Define associations
  Transaction.associate = (models) => {
    Transaction.belongsTo(models.Invoice, { foreignKey: "invoiceId" }); // Transaction belongs to an invoice
  }
  return Transaction;
};
