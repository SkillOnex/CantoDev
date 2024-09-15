const express = require('express');
const path = require('path'); // Módulo para resolver caminhos de arquivos
const sequelize = require('./config/db');
const session = require('express-session');
const cookieParser = require('cookie-parser');


const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const { logout } = require('./controllers/authController');
const indexRoutes = require('./routes/indexRoutes'); // Inclua esta linha
const { loadUser ,protect } = require('./middleware/authMiddleware');


const app = express();




// Middleware
app.use(express.json()); // Para processar JSON no corpo das requisições
app.use(express.urlencoded({ extended: true })); // Para processar dados de formulários
app.use(cookieParser());
app.use(session({
  secret: process.env.COOKIE_SECRET, // Substitua por uma chave secreta segura
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true , maxAge: 1000 * 60 * 60 * 24 * 7 }
}));




app.use(express.static(path.join(__dirname, 'public')));
// Configurar o motor de visualização
app.set('views', path.join(__dirname, 'views')); // Definir a pasta de views
app.set('view engine', 'ejs'); // Definir o motor de template como EJS

// Rotas
app.use('/posts', postRoutes);
app.use('/api/auth', authRoutes); // Rotas de autenticação, se estiver usando


// Rotas para renderizar páginas
app.get('/register', (req, res) => {
    res.render('register');
  });
  
app.get('/login', (req, res) => {
  res.render('login', {user : req.user});
});

app.use('/logout', logout);

app.use(loadUser);

app.use('/', indexRoutes); // Adicione esta linha



// Use suas rotas
app.use('/posts', postRoutes); // Assumindo que suas rotas de post estão no prefixo /posts



// Sincronize com o banco de dados e inicie o servidor
sequelize.sync().then(() => {
  console.log('Banco de dados sincronizado');
}).catch(err => console.log(err));

module.exports = app; // Exporta o app configurado
