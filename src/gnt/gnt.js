import { resetDB, getPlayerByID, getGameState, writeDB, updatePlayers, updatePlayer, updateGameState, RegisterNewPlayer, getData, getPlayers } from "./data.js"
import { IsFrozen, Unfreeze } from "./util.js"
import { strikethrough, bold } from "discord.js"

// reset whole game
export function ResetGame(playerData=undefined) {
    resetDB(playerData)
    console.log("Game reset:", (new Date()).toLocaleString())
}

// player jump in the game
export function AddPlayer(playerName, id, team="???", health=5) {
    const gameState = getGameState()
    if (gameState.SuddenDeath) {
        return RegisterNewPlayer(playerName, team, id, health=1)
    }
    return RegisterNewPlayer(playerName, team, id, health=health)
}

// doesn't consider cooldown but consider frozen state
// return whether it's a kill or not
// TODO: error handling (putting it here for now)
export function GNT(attackerID, givenID, takenID) {
    let attacker = getPlayerByID(attackerID)
    let given = getPlayerByID(givenID)
    let taken = getPlayerByID(takenID)
    const State = getGameState()

    // if the attacker is frozen
    if (IsFrozen(attacker)) {
        Unfreeze(attacker)
        throw new Error("Attacker frozen")
    }

    // if cannot found player1 or player2
    if (!given || !taken) throw new Error("Can't find player")

    // gnt
    if (given.heatlh <= 0) throw new Error("Friend already dead")
    if (taken.health <= 0) throw new Error("Attacked player already dead")

    if (IsFrozen(given)) throw new Error("Friend frozen")
    if (IsFrozen(taken)) throw new Error("Attacked player frozen")

    if (!State.SuddenDeath) given.health += 1
    taken.health -= 1

    if (given.id === attacker.id) {
        given.lastGNT = new Date().getTime()
        updatePlayers(given, taken)
    }
    else {
        attacker.lastGNT = new Date().getTime()
        updatePlayers(given, taken, attacker)
    }

    if (taken.health === 0) return true
    else return false
}

// sudden death
export function SuddenDeath() {
    let playerData = getPlayers()
    playerData = playerData.map(p => {
        if (p.health > 1) p.health = 1
        return p
    })
    writeDB()
    let gameState = getGameState()
    gameState.SuddenDeath = true
    writeDB()
}

// print the game status in the gnt format
export function PrintGameStatus() {
    const GameState = getGameState()
    const PlayerData = getData("alive")

    let output = bold("\n= Game status =\n")
    output += "\n"
    if (GameState.AllowEntry) output += "Entry open\n"
    else output += "Entry closed\n"
    if (GameState.SuddenDeath) output += "Sudden death!\n"
    output += "\n"
    
    output += bold("= Players status =\n")
    let currentTeam = ""
    for (let player of PlayerData) {
        // if team changed then display team
        if (currentTeam !== player.team) {
            currentTeam = player.team
            output = output + "\n" + bold(currentTeam) + "\n"
        }

        const line = `${player.nickname} ${player.health}`
        if (IsFrozen(player)) output = output + strikethrough(line) + "\n"
        else output = output + line + "\n"
    }
    return output
} 