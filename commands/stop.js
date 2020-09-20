module.exports = {
    name: 'stop',
    description: 'Stop listener for Among Us game.',
    aliases: ['stopgame', 'gamestop'],
    cooldown: 5,
    guildOnly: true,
    args: false,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        let botVoiceConnection = message.guild.voice.channel;
        if (!botVoiceConnection) {
            message.channel.send("Not currently running.");
        } else {
            let members = botVoiceConnection.members;
            members.each(user => user.voice.setMute(false));
            botVoiceConnection.leave();
            // TODO Check if listener is on already before turning it off
            try {
                database.ref('/guilds/' + message.guild.id + '/voteState').off('value', FBlistener);
            } catch (error) {
                message.channel.send("Error!" + error);
            }
        }
    },
};