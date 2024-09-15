// routes/postRoutes.js
const express = require('express');
const { getPosts, createPost } = require('../controllers/postController');
const { protect, loadUser } = require('../middleware/authMiddleware'); // Certifique-se de importar o loadUser
const router = express.Router();

// Aplica o middleware loadUser globalmente, para garantir que req.user esteja disponível
router.use(loadUser);

// Rota para renderizar a página de criação de post, protegida com o middleware protect
router.get('/create-post', protect, (req, res) => {
    res.render('createPost', { user: req.user }); // Renderiza views/createPost.ejs
});

// Rota para criar um novo post, protegida com o middleware protect
router.post('/', protect, createPost);

module.exports = router;
