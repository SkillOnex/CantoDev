// controllers/ost
const { Post, User, Comment } = require("../models/index");

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment, attributes: ['content', 'createdAt'], include: [{ model: User, attributes: ['username'] }] }
            ],
            order: [['createdAt', 'DESC']]
        });
        
        // Função para calcular o tempo decorrido com ajuste de fuso horário
        function timeAgo(date) {
            const now = new Date();
            const adjustedDate = new Date(date.toLocaleString('en-US', { timeZone: 'America/Sao_Paulo' })); // Ajusta o fuso
            const seconds = Math.floor((now - adjustedDate) / 1000);

            const years = Math.floor(seconds / 31536000);
            const months = Math.floor(seconds / 2592000);
            const days = Math.floor(seconds / 86400);
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor(seconds / 60);

            if (years >= 1) return years === 1 ? "1 ano atrás" : `${years} anos atrás`;
            else if (months >= 1) return months === 1 ? "1 mês atrás" : `${months} meses atrás`;
            else if (days >= 1) return days === 1 ? "1 dia atrás" : `${days} dias atrás`;
            else if (hours >= 1) return hours === 1 ? "1 hora atrás" : `${hours} horas atrás`;
            else if (minutes >= 1) return minutes === 1 ? "1 minuto atrás" : `${minutes} minutos atrás`;
            else return `${Math.floor(seconds)} segundos atrás`;
        }

        // Aplicar a função ajustada para postagens e comentários
        const formattedPosts = posts.map(post => {
           
            const formattedComments = post.Comments.map(comment => {
                console.log(comment.createdAt);
                return {
                    ...comment.toJSON(),
                    timeAgo: timeAgo(new Date(comment.createdAt)) // Calcular o tempo decorrido para o comentário no servidor
                };
            });
            
            return {
                
                ...post.toJSON(),
                timeAgo: timeAgo(new Date(post.createdAt)), // Calcular o tempo decorrido para o post no servidor
                Comments: formattedComments // Incluir os comentários formatados
                
            };
            
        });


        res.render('index', { posts: formattedPosts, user: req.user });
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).json({ message: 'Erro ao buscar posts', error });
    }
};


exports.createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Verifica se o título e o conteúdo são fornecidos
        if (!title || !content) {
            return res
                .status(400)
                .json({ message: "Título e conteúdo são obrigatórios." });
        }

        // Cria um novo post
        const newPost = await Post.create({
            title,
            content,
            userId: req.user.id, // Associa o post ao usuário atual
        });

        // Redireciona para a página principal ou para o post recém-criado
        res.redirect("/");
    } catch (error) {
        console.error("Erro ao criar post:", error);
        res.status(500).json({ message: "Erro ao criar post", error });
    }
};
