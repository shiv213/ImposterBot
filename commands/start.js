module.exports = {
    name: 'start',
    description: 'Start listener for Among Us game.',
    aliases: ['startgame', 'gamestart'],
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
                } else {
                    let id = message.guild.id.toString() + message.member.voice.id.toString();
                    database[id] = {};
                    database[id].started = true;
                    database[id].users = message.member.voice.channel.members;
                }
            }
        } else {
            message.channel.send("Please join a voice channel first!");
        }
    },
};