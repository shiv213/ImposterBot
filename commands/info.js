module.exports = {
    name: 'info',
    description: 'Display info required by the listener (join voice channel before running).',
    guildOnly: true,
    execute(message) {
        if (message.member.voice.channel) {
            message.channel.send("Server **" + message.guild.name + "** has **" + message.guild.memberCount + "** total members. \nGuild ID is **" + message.guild.id + "**\nCurrent voice channel ID is **" + message.member.voice.channel.id+"**");
        } else {
            message.channel.send("Please join a voice channel first!");
        }
    },
};