const {prefix} = require('../config.json');

module.exports = {
    name: 'help',
    description: 'List all of my commands or info about a specific command.',
    aliases: ['commands', 'info'],
    usage: '[command name]',
    cooldown: 3,
    execute(message, args) {
        const embedContent = {
            "title": "~Help~",
            "url": "https://github.com/shiv213/ImposterBot",
            "color": 10038562,
            "footer": {
                "icon_url": "https://i.imgur.com/TLMyjPM.png",
                "text": "Currently serving " + `${message.client.guilds.cache.size}` + " servers"
            },
            "thumbnail": {
                "url": "https://i.imgur.com/LHkwkNC.png"
            },
            "author": {
                "name": "ImposterBot",
                "url": "https://discord.com/api/oauth2/authorize?client_id=755510808397742171&permissions=29878336&scope=bot",
                "icon_url": "https://i.imgur.com/TLMyjPM.png"
            },
            "fields": [{
                "name": ":revolving_hearts: Made with love by @shiv213#7699",
                "value": "ImposterBot#3716 © 2020"
            }]
        };
        const data = [];
        const {commands} = message.client;

        if (!args.length) {
            message.author.send({embed: embedContent});
            data.push('Here\'s a list of all my commands:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

            return message.author.send(data, {split: true})
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('I\'ve sent you a DM with all my commands!');
                })
                .catch(error => {
                    console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
                    message.reply('it seems like I can\'t DM you!');
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('that\'s not a valid command!');
        }

        data.push(`**Name:** ${command.name}`);

        if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
        if (command.description) data.push(`**Description:** ${command.description}`);
        if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
        if (command.guildOnly) data.push(`**Server Only:** ${command.guildOnly}`);
        data.push(`**Cooldown:** ${command.cooldown || "No"} second(s)`);

        message.channel.send(data, {split: true});
    },
};
