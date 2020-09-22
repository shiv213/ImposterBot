module.exports = {
    name: 'start',
    description: 'Start listener for Among Us game.',
    aliases: ['startgame', 'gamestart'],
    cooldown: 5,
    guildOnly: true,
    args: false,
    async execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        if (message.member.voice.channel) {
            await message.member.voice.channel.join().then(connection => {
                connection.voice.setSelfDeaf(true);
                if (global.FBlistener[message.guild.id] !== null) {
                    message.channel.send("Already running.");
                } else {
                    // TODO listen to who joins the channel and (un)mute
                    global.FBlistener[message.guild.id] = database.ref('/guilds/' + message.guild.id + '/voteState').on('value', function (snapshot) {
                        let botVoiceConnection = message.guild.voice.channel;
                        let members = botVoiceConnection.members;
                        let voteState = snapshot.val();
                        if (botVoiceConnection) {
                            members.each(user => user.voice.setMute(voteState === 0).catch(e => {
                                console.log(e);
                            }));
                        }
                    });
                }
            }).catch(e => {
                message.channel.send("Error:" + e);
            })
        } else {
            message.channel.send("Please join a voice channel first!");
            global.FBlistener[message.guild.id] = null;
        }
    },
};