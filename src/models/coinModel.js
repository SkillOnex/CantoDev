// models/coinModel.js
const defineCoin = (sequelize, DataTypes) => {
    const Coin = sequelize.define('Coin', {
        type: {
            type: DataTypes.ENUM('CantoCoin', 'HelpCoin'),
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
       
        // Campos de data para tracking
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    });

    

    return Coin;
};

module.exports = defineCoin;
