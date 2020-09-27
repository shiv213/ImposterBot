module.exports = {
    name: 'start',
    description: 'Start listener for Among Us game.',
    aliases: ['startgame', 'gamestart'],
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute(message) {
        if (message.member.voice.channel) {
            for (let game in database) {
                if (database[game].serverID === message.guild.id && database[game].vcID === message.member.voice.channel.id) {
                    if (database[game].started) {
                        message.channel.send("Already running.");
                    } else {
                        database[game].started = true;
                        database[game].users = message.member.voice.channel.members;
                    }
                }
            }
            let id = message.guild.id.toString() + message.member.voice.channel.id.toString();
            if (database[id] === undefined) {
                database[id] = {};
                database[id].started = true;
                database[id].serverID = message.guild.id.toString();
                database[id].vcID = message.member.voice.channel.id.toString();
                database[id].users = message.member.voice.channel.members;
                database[id].gameState = "game";
            }
            updateGameState(id);
        } else {
            message.channel.send("Please join a voice channel first!");
        }
    },
}
;