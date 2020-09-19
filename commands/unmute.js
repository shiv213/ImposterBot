module.exports = {
    name: 'unmute',
    description: 'Unmutes all members.',
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        if (message.member.voice.channel) {
            let clientVoiceConnection = message.guild.voice.channel;
            let members = clientVoiceConnection.members;
            members.each(user => console.log(user.voice.setMute(false)));
        } else {
            message.channel.startTyping();
            message.channel.send("Please join a voice channel first!").then(r => message.channel.stopTyping());
        }
    },
};