// routes/indexRoutes.js
const express = require('express');
const { getPosts } = require('../controllers/postController');
const router = express.Router();

// Rota para a página inicial
router.get('/', getPosts); // Certifique-se de que getPostsPage está definido corretamente

module.exports = router;
