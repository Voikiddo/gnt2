import * as AdminCommands from "./handle_commands/admin_commands.js"
import * as GlobalCommands from "./handle_commands/gnt_commands.js"
import { PrintGameStatus } from "../gnt/gnt.js"

const GNT_SYMBOL = "?"
const ADMIN_SYMBOL = "!"

export async function OnMessageCreate(message, client) {
    let fullMessage
    if (message.partial) {
        await message.fetch()
            .then(m => {
                fullMessage = m.content.toLowerCase();
            })
            .catch(error => {
                console.log('Something went wrong when fetching the message: ', error);
            });
    } else {
        fullMessage = message.content.toLowerCase();
    }

    // ignore the first symbol split the command message into list
    const CommandSymbol = fullMessage[0]
    const CommandMessage = fullMessage.slice(1).split(" ")

    // admin commands
    if (CommandSymbol === ADMIN_SYMBOL && message.member.roles.cache.some(e=>e.id==='1104334111633584128')) {
        if (AdminCommands.run(CommandMessage)) return true
    }

    // global commands
    if (CommandSymbol !== GNT_SYMBOL && CommandSymbol !== ADMIN_SYMBOL) return false
    
    const commandOutcome = GlobalCommands.run(CommandMessage, message.member)
    if (commandOutcome.success) {
        const replyMessage = commandOutcome.message + "\n" + PrintGameStatus()
        message.reply(replyMessage).catch((error)=>{
            console.log(`Something went wrong replying message. Response: ${commandOutcome.message}`)
        })
        return true
    }
    else {
        const replyMessage = commandOutcome.message
        message.reply(replyMessage).catch((error)=>{
            console.log(`Something went wrong replying message: ${replyMessage}`)
        })
        return false
    }
}