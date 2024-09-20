// testWebhook.js
const { SendNewPost } = require('../webhooks/discordWebhook');

// Parâmetros de teste
const title = 'Teste de Webhook';
const content = 'Esta é uma mensagem de teste enviada pelo console!';
const userId = 'TestUser123'; // Pode ser qualquer identificador ou nome

// Enviar a mensagem
SendNewPost(title, content, userId, 1)
    .then(() => console.log('Mensagem enviada com sucesso!'))
    .catch((err) => console.error('Erro ao enviar mensagem:', err));


