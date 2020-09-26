module.exports = {
    name: 'start',
    description: 'Start listener for Among Us game.',
    aliases: ['startgame', 'gamestart'],
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        message.channel.send("ImposterBot is currently down, please check back soon!");
    },
};