module.exports = {
    name: 'stop',
    description: 'Stop listener for Among Us game.',
    aliases: ['stopgame', 'gamestop'],
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute(message) {
        if (message.member.voice.channel) {
            message.member.voice.channel.members.each(async user => await user.voice.setMute(false).catch(err => console.log(err)));
            for (let game in database) {
                if (database[game].serverID === message.guild.id && database[game].vcID === message.member.voice.channel.id) {
                    if (database[game].started) {
                        database[game].started = false;
                    } else {
                        message.channel.send("Already stopped.");
                    }
                }
            }
        } else {
            message.channel.send("Please join a voice channel first!");
        }
    },
};
