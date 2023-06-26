const { StartServer } = require("./server/server.js")
const { StartClient } = require("./discordjs/discordClient.js")

// start the server to scam the server and also does things
StartServer()

// start discord js client
StartClient()