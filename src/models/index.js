// models/index.js
const sequelize = require('../config/db'); // Aqui você importa o sequelize
const { DataTypes } = require('sequelize');

// Importar as funções de definição
const defineUser = require('./userModel');
const definePost = require('./postModel');
const defineComment = require('./commentModel');

// Definir modelos
const User = defineUser(sequelize, DataTypes);
const Post = definePost(sequelize, DataTypes, User);
const Comment = defineComment(sequelize, DataTypes, User, Post);

// Definir associações
User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });

Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' });
Comment.belongsTo(Post, { foreignKey: 'postId' });

Comment.belongsTo(User, { foreignKey: 'userId' });

// Exportar os modelos e sequelize
module.exports = { sequelize, User, Post, Comment };
