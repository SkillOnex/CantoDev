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
router.post('/', protect, createPost); // Esta linha pode estar causando o problema

// Rota para criar um novo comentário
router.post('/posts/:id/comment', protect, async (req, res) => {
    const { content } = req.body;
    const postId = req.params.id;

    try {
        await Comment.create({
            content: DOMPurify.sanitize(content),
            postId: postId,
            userId: req.user.id
        });

        return res.redirect(`/posts/${postId}`);
    } catch (error) {
        console.error('Erro ao criar comentário:', error);
        res.status(500).json({ message: 'Erro ao criar comentário', error: error.message });
    }
});

// Rota para visualizar um post específico (e seus comentários)
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment, include: [User] }
            ]
        });

        if (!post) return res.status(404).json({ message: 'Post não encontrado' });

        res.render('postDetail', { post: post.toJSON(), user: req.user });
    } catch (error) {
        console.error('Erro ao buscar post:', error);
        res.status(500).json({ message: 'Erro ao buscar post', error });
    }
});

module.exports = router;
