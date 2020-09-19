module.exports = {
    name: 'stop',
    description: 'Stop listener for Among Us game.',
    // usage: '',
    aliases: ['stopgame', 'gamestop'],
    cooldown: 30,
    guildOnly: true,
    args: false,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        if (message.guild.voice === undefined) {
            message.channel.send("Not currently running.");
        } else if (message.member.voice.channel) {
            let clientVoiceConnection = message.guild.voice.channel;
            let members = clientVoiceConnection.members;
            members.each(user => user.voice.setMute(false));
            clientVoiceConnection.leave();
            database.ref('/guilds/' + message.guild.id + '/voteState').off('value', listener);
        } else {
            message.channel.send("Please join a voice channel first!");
        }
    },
};