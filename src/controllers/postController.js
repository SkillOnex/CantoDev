// controllers/postController.js
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

// Crie uma instância de JSDOM
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const Post = require('../models/postModel');
const User = require('../models/userModel');

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [{ model: User, attributes: ['username'] }],
            order: [['createdAt', 'DESC']]
        });

        // Função para calcular tempo decorrido
        function timeAgo(date) {
            const now = new Date();
            const seconds = Math.floor((now - date) / 1000);

            const years = Math.floor(seconds / 31536000);
            const months = Math.floor(seconds / 2592000);
            const days = Math.floor(seconds / 86400);
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor(seconds / 60);

            if (years > 1) return `${years} anos atrás`;
            else if (months > 1) return `${months} meses atrás`;
            else if (days > 1) return `${days} dias atrás`;
            else if (hours > 1) return `${hours} horas atrás`;
            else if (minutes > 1) return `${minutes} minutos atrás`;
            else return `${Math.floor(seconds)} segundos atrás`;
        }

        // Formatar a data de cada post
        const formattedPosts = posts.map(post => {
            
            return {
                ...post.toJSON(),
                timeAgo: timeAgo(new Date(post.createdAt))
            };
        });

        res.render('index', { posts: formattedPosts , user: req.user });
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).json({ message: 'Erro ao buscar posts', error });
    }
};






// Configure DOMPurify para permitir listas (<ul>, <ol>, <li>)
exports.createPost = async (req, res) => {
    const { title, content } = req.body;

    // Sanitizar o conteúdo permitindo tags de lista
    const sanitizedTitle = DOMPurify.sanitize(title, { ALLOWED_TAGS: ['b', 'i', 'strong', 'em', 'ul', 'ol', 'li'] });
    const sanitizedContent = DOMPurify.sanitize(content, { ALLOWED_TAGS: ['b', 'i', 'strong', 'em', 'ul', 'ol', 'li'] });

    try {
        const post = await Post.create({
            title: sanitizedTitle,
            content: sanitizedContent,
            userId: req.user.id,
        });
        
        return res.redirect('/');
    } catch (error) {
        console.error('Erro ao criar post:', error);
        res.status(500).json({ message: 'Erro ao criar post', error: error.message });
    }
};
