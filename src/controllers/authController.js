const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { response } = require("../app");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({ username, email, password });
    req.session.userId = user.id; // Armazena o ID do usuário na sessão
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao registrar usuário" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  
  // Verifique se email e password estão presentes
  if (!email || !password) {
    return res.status(400).json({ message: "Email e senha são obrigatórios" });
  }



  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha incorreta" });
    }
    console.log("user.id",user.id);
    req.session.userId = user.id; // Armazena o ID do usuário na sessão
    console.log("session",req.session.userId)

    
    return res.redirect('/');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erro ao fazer login" });
  }
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Erro ao fazer logout" });
    res.json({ message: "Logout bem-sucedido" });
  });
};
