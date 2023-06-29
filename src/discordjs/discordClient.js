import "dotenv/config.js";
import { Client, Collection, Events, GatewayIntentBits, Partials, EmbedBuilder } from 'discord.js';
import { OnMessageCreate } from './message_create.js';

export function StartClient() {
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

    client.on(Events.MessageCreate, (message)=>OnMessageCreate(message, client))
    
    client.login(process.env.TOKEN);
}