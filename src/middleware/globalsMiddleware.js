const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

const csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken(); // Adiciona o token CSRF ao res.locals
  next();
};

module.exports = { csrfProtection, csrfMiddleware };
