// models/index.js
const sequelize = require('../config/db'); // Aqui você importa o sequelize
const { DataTypes } = require('sequelize');

// Importar as funções de definição
const defineUser = require('./userModel');
const definePost = require('./postModel');
const defineComment = require('./commentModel');
const defineCoin = require('./coinModel');
const defineTransaction = require('./transactionModel');


// Definir modelos
const User = defineUser(sequelize, DataTypes);
const Post = definePost(sequelize, DataTypes, User);
const Comment = defineComment(sequelize, DataTypes, User, Post);
const Coin = defineCoin(sequelize, DataTypes);
const Transaction = defineTransaction(sequelize, DataTypes);

// Definir associações
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

Comment.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Coin, { foreignKey: 'userId' });
Coin.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Coin, { foreignKey: 'postId', onDelete: 'CASCADE' });
Coin.belongsTo(Post, { foreignKey: 'postId' });

User.hasMany(Transaction, { foreignKey: 'userId' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

// Exportar os modelos e sequelize
module.exports = { sequelize, User, Post, Comment, Coin ,Transaction};
