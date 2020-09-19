module.exports = {
    name: 'start',
    description: 'Start listener for Among Us game.',
    // usage: '',
    aliases: ['startgame', 'gamestart'],
    cooldown: 30,
    guildOnly: true,
    args: false,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        global.listener = database.ref('/guilds/' + message.guild.id + '/voteState').on('value', async function (snapshot) {
            let voteState = snapshot.val();
            if (message.member.voice.channel) {
                await message.member.voice.channel.join().then(connection => {
                    connection.voice.setSelfDeaf(true);
                });
                let clientVoiceConnection = message.guild.voice.channel;
                let members = clientVoiceConnection.members;
                members.each(user => user.voice.setMute(voteState === 0));
            } else {
                message.channel.send("Please join a voice channel first!");
            }
        });
    },
};