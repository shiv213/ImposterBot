module.exports = {
    name: 'mute',
    description: 'Mutes all members.',
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        if (message.member.voice.channel) {
            message.member.voice.channel.members.each(async user => await user.voice.setMute(true));
        } else {
            message.channel.send("Please join a voice channel first!");
        }
    },
};