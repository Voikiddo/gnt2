import { resetDB, getPlayerByID, getGameState, updatePlayer, updateGameState, RegisterNewPlayer, getData } from "./data.js"
import { IsFrozen } from "./util.js"
import { strikethrough, bold } from "discord.js"

// reset whole game
export function ResetGame(playerData=undefined) {
    resetDB(playerData)
    console.log("Game reset:", (new Date()).toLocaleString())
}

// player jump in the game
export function AddPlayer(playerName, id, team="???", health=5) {
    return RegisterNewPlayer(playerName, team, id, health=health)
}

// doesn't consider cooldown but consider frozen state
// return whether it's a kill or not
// TODO: error handling (putting it here for now)
export function GNT(attackerID, ID1, ID2) {
    let attacker = getPlayerByID(attackerID)
    let player1 = getPlayerByID(ID1)
    let player2 = getPlayerByID(ID2)

    // if the attacker is frozen
    if (IsFrozen(attacker)) {
        attacker.lastGNT = new Date().getTime()
        updatePlayer(attacker)
        throw new Error("Attacker frozen")
    }

    // if cannot found player1 or player2
    if (!player1 || !player2) throw new Error("Can't find player")

    // player1: given
    // player2: taken
    if (attacker.team === player1.team && attacker.team !== player2.team) {
        if (player1.heatlh <= 0) throw new Error("Teammate already dead")
        if (player2.health <= 0) throw new Error("Attacked player already dead")

        if (IsFrozen(player1)) throw new Error("Teammate frozen")
        if (IsFrozen(player2)) throw new Error("Attacked player frozen")

        if (!State.SuddenDeath) player1.health++
        player2.health--

        updatePlayer(player1)
        updatePlayer(player2)

        if (player2.health === 0) return true
        else return false
    }

    // player1: taken
    // player2: given
    if (attacker.team === player2.team && attacker.team !== player1.team) {
        if (player1.health <= 0) throw new Error("Attacked player already dead")
        if (player2.heatlh <= 0) throw new Error("Teammate already dead")

        if (IsFrozen(player1)) throw new Error("Attacked player frozen")
        if (IsFrozen(player2)) throw new Error("Teammate frozen")

        player1.health--
        if (!State.SuddenDeath) player2.health++

        updatePlayer(player1)
        updatePlayer(player2)

        if (player1.health === 0) return true
        else return false
    }

    return Error("Team mismatch")
}

// sudden death
export function SuddenDeath() {
    let data = getData("all")
    data.PlayerData = data.PlayerData.map(p => {
        if (p.health > 1) p.heath = 1
        return p
    })
    data.GameState.SuddenDeath = true
    updateData(data)
}

// print the game status in the gnt format
export function PrintGameStatus() {
    const PlayerData = getData("alive")
    const FrozenThreshold = (new Date()).getTime() - (20 * 60 * 1000)

    let output = "Game status:"
    let currentTeam = ""
    for (let player in PlayerData) {
        // if team changed then display team
        if (currentTeam !== player.team) {
            currentTeam = player.team
            output = output + "\n" + bold(currentTeam) + "\n"
        }

        const line = `${player.nickname} ${player.health}`
        if (player.lastGNT > FrozenThreshold) output = output + line + "\n"
        else output = output + strikethrough(line) + "\n"
    }
    return output
} 