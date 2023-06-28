const GNT = require("../gnt/gnt")
const ADMIN_QOL = require("../gnt/admin_qol")

const GNT_SYMBOL = "?"
const ADMIN_SYMBOL = "!"

exports.OnMessageCreate = async (message, client) => {
    if (message.author.bot) return false;

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

    if (fullMessage.startsWith(ADMIN_SYMBOL)) {
        if (!message.member.roles.cache.some(e=>e.id==='1104334111633584128')) return false // check if is admin
        
    }
    if (!fullMessage.startsWith(GNT_SYMBOL)) return false
    
    return true
}