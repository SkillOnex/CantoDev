// models/transactionModel.js
const defineTransaction = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
        type: {
            type: DataTypes.ENUM('CantoCoin', 'HelpCoin'),
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING, 
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });

    return Transaction;
};

module.exports = defineTransaction;
