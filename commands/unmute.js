module.exports = {
    name: 'unmute',
    description: 'Unmutes all members.',
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        if (message.member.voice.channel) {
            message.member.voice.channel.members.each(user => user.voice.setSelfMute(false));
        } else {
            message.channel.send("Please join a voice channel first!");
        }
    },
};