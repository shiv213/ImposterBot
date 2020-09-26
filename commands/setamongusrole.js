module.exports = {
    name: 'setamongusrole',
    description: 'Set the default role to be used for Among Us notifications.',
    usage: '[current server\'s Among Us role]',
    aliases: ['amongusrole'],
    cooldown: 120,
    guildOnly: true,
    args: true,
    execute(message, args, {Canvas: Canvas, Discord: Discord}) {
        message.channel.send("ImposterBot is currently down, please check back soon!");
    },
}
;