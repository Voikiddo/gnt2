const BOT_SYMBOL = "?"

exports.OnMessageCreate = async (message) => {
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

    if (!fullMessage.startsWith(BOT_SYMBOL)) return false;
}