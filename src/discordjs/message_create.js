// import GNT from "../gnt/gnt.js"
// import ADMIN_QOL from "../gnt/admin_qol.js"

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

    console.log(message.author);

    if (fullMessage.startsWith(ADMIN_SYMBOL)) {
        if (!message.member.roles.cache.some(e=>e.id==='1104334111633584128')) return false // check if is admin
        
    }
    if (!fullMessage.startsWith(GNT_SYMBOL)) return false
    
    return true
}