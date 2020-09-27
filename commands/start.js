module.exports = {
    name: 'start',
    description: 'Start listener for Among Us game.',
    aliases: ['startgame', 'gamestart'],
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        if (message.member.voice.channel) {
            for (let game = 0; game < database.length; game++) {
                if (database[game].serverID === message.guild.id && database[game].vcID === message.member.voice.id) {
                    if (database[game].started) {
                        database[game].started = false;
                    } else {
                        message.channel.send("Already running.");
                    }
                }
            }
        } else {
            message.channel.send("Please join a voice channel first!");
        }
    },
};