module.exports = {
    name: 'newgame',
    description: 'Announce Among Us game to the server.',
    usage: '[join code]',
    aliases: ['newroom', 'newlobby'],
    cooldown: 10,
    guildOnly: true,
    args: true,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        message.channel.send("ImposterBot is currently down, please check back soon!");
    },
};