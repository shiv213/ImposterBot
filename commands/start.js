module.exports = {
    name: 'start',
    description: 'Start listener for Among Us game.',
    aliases: ['startgame', 'gamestart'],
    cooldown: 5,
    guildOnly: true,
    args: false,
    async execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        // TODO Check if author of message is in vc else warn : Done
        // TODO Make the bot join a VC and mute/unmute all members in that vc : Done
        // TODO Make the bot deafen itself : Done
        if (message.member.voice.channel) {
            await message.member.voice.channel.join().then(connection => {
                connection.voice.setSelfDeaf(true);
                global.FBlistener = database.ref('/guilds/' + message.guild.id + '/voteState').on('value', function (snapshot) {
                    let botVoiceConnection = message.guild.voice.channel;
                    let members = botVoiceConnection.members;
                    let voteState = snapshot.val();
                    if (botVoiceConnection) {
                        members.each(user => user.voice.setMute(voteState === 0));
                    }
                });
            }).catch(e => {
                message.channel.send("Error:" + e);
            })
        } else {
            message.channel.send("Please join a voice channel first!");
            global.FBlistener = null;
        }
    },
};