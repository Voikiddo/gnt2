const GNT = require("../../gnt/gnt.js")
const ADMIN_QOL = require("../../gnt/admin_qol.js")

exports.run = (message) => {
    switch (message[0]) {
        case "start":
            GNT.ResetGame();
            return true
        case "add":
            if (!message[1] || !message[2]) return false
            if (message[3]) GNT.AddPlayer(message[1], message[2], message[3])
            else GNT.AddPlayer(message[1], message[2])
    }
}