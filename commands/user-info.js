module.exports = {
    name: 'user-info',
    description: 'Display info about yourself.',
    aliases: ['user', 'me'],
    cooldown: 10,
    execute(message) {
        message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
    },
};