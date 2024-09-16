// middleware/authMiddleware.js
const User = require('../models/userModel'); // Substitua pelo caminho correto para o modelo de usuário

exports.protect = async (req, res, next) => {
  console.log(req.session.userId)
  if (!req.session.userId) {
    return res.redirect('/');
  }
  next();
};

exports.loadUser = async (req, res, next) => {
  if (req.session.userId) {
    try {
      const user = await User.findByPk(req.session.userId);
      if (user) {
        req.user = user; // Adiciona o usuário completo ao objeto req
      } else {
        // Se o usuário não for encontrado, pode limpar a sessão ou tratar de outra forma
        req.session.destroy(); // Remove a sessão se o usuário não for encontrado
      }
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar informações do usuário', error });
    }
  }
  next();
};