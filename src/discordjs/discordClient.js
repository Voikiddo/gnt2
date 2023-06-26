const { Client, Collection, Events, GatewayIntentBits, Partials, EmbedBuilder  } = require('discord.js');
const { OnMessageCreate } = require('./message_create.js')
require("dotenv").config()

exports.StartClient = () => {
    const client = new Client({
        intents: [
            GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
        partials: [Partials.Message, Partials.Channel]
    });
    
    client.cooldowns = new Collection();
    
    client.once(Events.ClientReady, c => {
        console.log(`Ready! Logged in as ${c.user.tag}`);
    });

    client.on(Events.MessageCreate, OnMessageCreate)
    
    client.login(process.env.TOKEN);
}