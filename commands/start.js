module.exports = {
    name: 'start',
    description: 'Start listener for Among Us game.',
    aliases: ['startgame', 'gamestart'],
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        if (message.member.voice.channel) {
            if (global.FBlistener[message.guild.id] !== undefined) {
                message.channel.send("Already running.");
            } else {
                // TODO listen to who joins the channel and (un)mute
                global.FBlistener[message.guild.id] = database.ref('/guilds/' + message.guild.id + '/voteState').on('value', function (snapshot) {
                    let voiceChannel = message.member.voice.channel;
                    let voteState = snapshot.val();
                    voiceChannel.members.each(async user => await user.voice.setMute(voteState === 0).catch(e => {
                        console.log(e);
                    }));
                });
            }
        } else {
            message.channel.send("Please join a voice channel first!");
            global.FBlistener[message.guild.id] = null;
        }
    },
};