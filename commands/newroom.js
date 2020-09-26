module.exports = {
    name: 'newgame',
    description: 'Announce Among Us game to the server.',
    usage: '[join code]',
    aliases: ['newroom', 'newlobby'],
    cooldown: 10,
    guildOnly: true,
    args: true,
    async execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        await message.channel.startTyping();
        const newgameEmbed = new Discord.MessageEmbed()
            .setColor('#8a0000')
            .setTitle('New Among Us Game!')
            .setAuthor('ImposterBot', 'https://i.imgur.com/TLMyjPM.png', 'https://github.com/shiv213/ImposterBot')
            .setThumbnail('https://i.imgur.com/LHkwkNC.png')
            .addFields(
                {name: "CODE: ", value: args[0], inline: true},
            )
            .setTimestamp()
            .setFooter('Join now!');
        message.channel.send(newgameEmbed).then(r => message.channel.stopTyping());

    },
};