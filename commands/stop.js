module.exports = {
    name: 'stop',
    description: 'Stop listener for Among Us game.',
    aliases: ['stopgame', 'gamestop'],
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute(message) {
        if (message.member.voice.channel) {
            for (let game = 0; game < database.length; game++) {
                if (database[game].serverID === message.guild.id && database[game].vcID === message.member.voice.id) {
                    if (database[game].started) {
                        message.channel.send("Already running.");
                    } else {
                        database[game].started = true;
                        database[game].users = message.member.voice.channel.members;
                    }
                }
            }
        } else {
            message.channel.send("Please join a voice channel first!");
        }
    },
};