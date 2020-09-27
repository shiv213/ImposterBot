module.exports = {
    name: 'unmute',
    description: 'Unmutes all members.',
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        let channel = message.member.voice.channel;
        if (channel) {
            channel.members.each(async user => await user.voice.setMute(false).catch(err => console.log(err)));
        } else {
            message.channel.send("Please join a voice channel first!");
        }
    },
};