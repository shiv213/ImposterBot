module.exports = {
    name: 'server',
    description: 'Display info about current server.',
    guildOnly: true,
    execute(message) {
        message.channel.send(`Server **${message.guild.name}** has **${message.guild.memberCount}** total members. \nGuild ID is ${message.guild.id}`);
    },
};