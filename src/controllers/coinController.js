// src/controllers/coinController.js

const { Coin } = require('../models/coinModel'); // Importe o modelo Coin

// Função para obter moedas do usuário atual
const getUserCoins = async (req, res) => {
    try {
        // Supondo que o ID do usuário está disponível em req.user.id
        const userId = req.user.id;

        // Buscar todas as moedas do usuário
        const coins = await Coin.findAll({
            where: {
                userId: userId
            }
        });

        // Calcular o total de moedas
        const totalCoins = coins.reduce((total, coin) => total + coin.amount, 0);

        // Responder com os dados das moedas e o total
        res.json({ coins, totalCoins });
    } catch (error) {
        console.error('Erro ao obter moedas do usuário:', error);
        res.status(500).json({ message: 'Erro ao obter moedas do usuário', error: error.message });
    }
};

module.exports = { getUserCoins };
