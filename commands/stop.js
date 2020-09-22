module.exports = {
    name: 'stop',
    description: 'Stop listener for Among Us game.',
    aliases: ['stopgame', 'gamestop'],
    cooldown: 5,
    guildOnly: true,
    args: false,
    async execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        if (global.FBlistener[message.guild.id] === null || message.guild.voice === undefined) {
            message.channel.send("Not currently running.");
        } else if (!message.member.voice.channel) {
            message.channel.send("Please join a voice channel first!");
        } else {
            try {
                database.ref('/guilds/' + message.guild.id + '/voteState').off('value', global.FBlistener[message.guild.id]);
                global.FBlistener[message.guild.id] = null;
            } catch (error) {
                message.channel.send("Error: " + error);
            }
            let members = message.guild.voice.channel.members;
            members.each(async function (user) {
                await user.voice.setMute(false);
            });
            await message.guild.voice.channel.leave();
        }
    },
};