module.exports = {
    name: 'mute',
    description: 'Mutes all members.',
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        if (message.member.voice.channel) {
            let botVoiceConnection = message.guild.voice.channel;
            let members = botVoiceConnection.members;
            members.each(user => user.voice.setMute(true));
        } else {
            message.channel.send("Please join a voice channel first!");
        }
    },
};