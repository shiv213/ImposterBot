module.exports = {
    name: 'start',
    description: 'Start listener for Among Us game.',
    // usage: '',
    aliases: ['startgame', 'gamestart'],
    cooldown: 30,
    guildOnly: true,
    args: false,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        database.ref('/guilds/' + message.guild.id + '/voteState').on('value', function (snapshot) {
            let voteState = snapshot.val();
            // TODO Check if author of message is in vc else warn
            let channel = message.member.voiceChannel;
            while (voteState === 0) {
                for (let member of channel.members) {
                    member[1].setMute(true);
                }
            }
            for (let member of channel.members) {
                member[1].setMute(false);
            }
        });
    },
};