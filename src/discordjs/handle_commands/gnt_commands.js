import * as GNT from "../../gnt/gnt.js";
import * as Utils from "../../gnt/util.js";

export function run(message, commander) {
    const CommanderID = parseInt(commander.id)
    const CommanderName = commander.displayName.split(' ')[0]

    switch(message[0]) {
        case "team":
            if (!message[1]) return ReturnObject(false, "Please enter team name.")

            if (!Utils.HasPlayer(CommanderID)) {
                GNT.AddPlayer(CommanderName, CommanderID, message[1].toUpperCase())
                return ReturnObject(true, "You are now in the game!")
            }
        
            Utils.SetTeam(CommanderID, message[1].toUpperCase())
            return ReturnObject(true, "Successfully set your team!")

        case "gnt":
            return HandleGNT(message, commander)

        case "status":
            return ReturnObject(true, "Here you go.")

        default:
            return ReturnObject(false, "No such command. (Pls contact voik if you think something is wrong)")
    }
}

function HandleGNT(message, commander) {
    const CommanderID = parseInt(commander.id)
    const CommanderName = commander.displayName.split(' ')[0]

    if (Utils.IsFrozenByID(CommanderID)) {
        Utils.Unfreeze(CommanderID)
        return ReturnObject(true, "Welcome back to the game! Please wait before you can gnt again :)")
    }

    switch(message.length) {
        case 1:
            if (!Utils.HasPlayer(CommanderID)) {
                GNT.AddPlayer(CommanderName, CommanderID)
                return ReturnObject(true, "You are now in the game!")
            }

            return ReturnObject(false, "Type ?GNT [enemy] [teammate] or other way around to do give-and-take!")

        case 2:
            const attackedID = Utils.FindIDByName(message[1])
            if (!attackedID) {
                return ReturnObject(false, "Name invalid. Please type their nickname in game.")
            }

            try {
                const killed = GNT.GNT(CommanderID, CommanderID, attackedID)

                if (killed) return ReturnObject(true, `${CommanderName} killed ${message[1]}!`)
                else return ReturnObject(true, `${CommanderName} took one heart from ${message[1]}!`)
            }
            catch (err) {
                return ReturnObject(false, err.message)
            }

        default:
            const player1ID = Utils.FindIDByName(message[1])
            const player2ID = Utils.FindIDByName(message[2])
            if (!player1ID || !player2ID) {
                return ReturnObject(false, "Name invalid. Please type their nickname in game.")
            }

            try {
                const killed = GNT.GNT(CommanderID, player1ID, player2ID)
                if (!killed) return ReturnObject(true, `${CommanderName} took one heart from an enemy and gave it to their teammate!`)
                
                // taken is dead
                return ReturnObject(true, `${CommanderName} killed ${message[2]} and gave the corpse to ${message[1]}!`)
            }
            catch (err) {
                return ReturnObject(false, err.message)
            }
    }
}

function ReturnObject(success, message) {
    return {
        "success": success,
        "message": message
    }
}