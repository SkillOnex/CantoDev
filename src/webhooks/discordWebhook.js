// WebHooks/discordWebhook.js
const { Webhook, MessageBuilder } = require('discord-webhook-node');
require('dotenv').config();
// Configure o webhook com URL
const hook = new Webhook(process.env.WEBHOOK);

// Personalizando nome e imagem do webhook
hook.setUsername('CantoDev')
    .setAvatar('https://cdn.discordapp.com/attachments/1285269066604347396/1286354350427340820/image.png?ex=66ed9a58&is=66ec48d8&hm=96c548c0af514232ee12c068951085861b5600985d0d277277a4b76b58031c92&');

// Função para enviar uma mensagem
const SendNewPost = (title, content, userId ,Coins) => {
    const embed = new MessageBuilder()
        .setAuthor(`${userId}`, 'https://i.pinimg.com/originals/a0/9c/65/a09c6589448809043c177b2ab4a859f5.jpg')
        .setTitle(title)
        .setColor('#2B2D31')
        .setDescription(content)
        .setFooter(`CantoCoins Recebidos : ${Coins}`)
        .setTimestamp();

    return hook.send(embed);
};



module.exports = { SendNewPost };
