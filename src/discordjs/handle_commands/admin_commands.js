import * as GNT from "../../gnt/gnt.js";
import * as Utils from "../../gnt/util.js";

export function run(message) {
    let player

    switch (message[0]) {
        case "start":
            GNT.ResetGame();
            return true
        case "heal":
            if (!message[1] || !message[2] || !Number(message[2])) return false
            player = Utils.FindIDByName(message[1])
            if (!player) return false
            Utils.AddHealth(player, Number(message[2]))
            return true
        case "hurt":
            if (!message[1] || !message[2] || !Number(message[2])) return false
            player = Utils.FindIDByName(message[1])
            if (!player) return false
            Utils.RemoveHealth(player, Number(message[2]))
            return true
        case "close":
            Utils.CloseEntry()
            return true
        case "open":
            Utils.OpenEntry()
            return true
        case "sudden-death":
            GNT.SuddenDeath()
            return true
        case "sd":
            GNT.SuddenDeath()
            return true
        case "add":
            if (!message[1] || !message[2]) return false
            if (!message[3]) return GNT.AddPlayer(message[1], message[2])
            else return GNT.AddPlayer(message[1], message[2], message[3])
        case "freeze":
            if (!message[1]) return false
            player = Utils.FindIDByName(message[1])
            if (!player) return false
            Utils.Freeze(player)
            return true
        case "unfreeze":
            if (!message[1]) return false
            player = Utils.FindIDByName(message[1])
            if (!player) return false
            Utils.Unfreeze(player)
            return true
        case "setteam":
            if (!message[1] || !message[2]) return false
            player = Utils.FindIDByName(message[1])
            if (!player) return false
            Utils.SetTeam(player, message[2])
        default:
            return false
    }
}