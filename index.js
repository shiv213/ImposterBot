const fs = require('fs');
const Discord = require('discord.js');
const Canvas = require("canvas");
require('dotenv').config();
const fetch = require("node-fetch")
const request = require('request');
const {prefix} = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const cooldowns = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const firebase = require("firebase/app");
require("firebase/database");

const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

Sentry.init({
    dsn: "https://1bc7eb6261a2469c9c800ee4c538f770@o450577.ingest.sentry.io/5435161",
    tracesSampleRate: 1.0,
});

try {


    firebase.initializeApp(firebaseConfig);
    global.database = firebase.database();

    global.writeGuildData = function writeGuildData(guildId, role) {
        database.ref('guilds/' + guildId).update({
            role: role
        });
    }

    global.getGuildData = function getGuildData(guildId) {
        return database.ref('/guilds/' + guildId).once('value').then(function (snapshot) {
            return snapshot.val().role || 'none';
        });
    }

// global.getVoteState = function getGuildData(guildId) {
//     return database.ref('/guilds/' + guildId).on('value').then(function(snapshot) {
//         return snapshot.val().voteState || 'none';
//     });
// }

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        client.commands.set(command.name, command);
    }

    client.once('ready', () => {
        client.user.setPresence({
            activity: {name: `.help | Serving ${client.guilds.cache.size} servers`},
            status: 'online'
        }).catch(console.error);
        console.log(`${client.user.tag} is ready to go!`);
    });
    client.on("guildCreate", guild => {
        console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
        const DMEmbed = new Discord.MessageEmbed()
            .setColor('#850b0b')
            .setTitle('Message from the creator of ImposterBot')
            .setDescription('Thanks for adding me to your server!')
            .addFields(
                {name: 'GitHub Page', value: '[ImposterBot](https://github.com/shiv213/ImposterBot)', inline: true},
            );
        client.users.cache.get(guild.ownerID).send(DMEmbed);
        client.user.setPresence({
            activity: {name: `.help | Serving ${client.guilds.cache.size} servers`},
            status: 'online'
        }).catch(console.error);
    });

    client.on("guildDelete", guild => {
        console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
        client.user.setPresence({
            activity: {name: `.help | Serving ${client.guilds.cache.size} servers`},
            status: 'online'
        }).catch(console.error);
    });

    client.on('guildMemberAdd', member => {
        const channel = member.guild.channels.cache.find(ch => ch.name === 'logging');
        if (!channel) return;
        channel.send(`Welcome to the server, ${member}!`);
    });

    client.on('message', message => {
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
        if (message.content.match(prefixMention)) {
            return message.reply(`My prefix on this guild is \`${prefix}\``);
        }

        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();
        const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        if (!command) return;
        if (command.guildOnly && message.channel.type !== 'text') {
            return message.reply('I can\'t execute that command inside DMs!');
        }
        if (command.args && !args.length) {
            let reply = `You didn't provide any arguments, ${message.author}!`;
            if (command.usage) {
                reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
            }
            return message.channel.send(reply);
        }
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new Discord.Collection());
        }
        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 0) * 1000;
        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }
        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        try {
            message.react('✅');
            command.execute(message, args, {Canvas: Canvas, Discord: Discord});
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }

    });


    client.login(process.env.TOKEN).catch(err => console.log(err));
    const cliArgs = process.argv.slice(2);
    if (cliArgs[0] === "test") {
        console.log("everything working!");
        process.exit(0);
    }

} catch (e) {
    Sentry.captureException(e);
}
