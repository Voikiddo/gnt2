const PlayerData = require("./data.js")

// reset whole game
exports.ResetGame = (playerData=undefined) => {
    if (playerData) PlayerData = playerData
    else PlayerData = []

    PlayerData.EntryClosed = false

    console.log("Game reset.")
}

// doesn't consider cooldown but consider frozen state
// return whether it's a kill or not
// TODO: error handling (putting it here for now)
exports.GNT = (attackerID, ID1, ID2) => {
    let attacker = PlayerData.getPlayerByID(attackerID)
    let player1 = PlayerData.getPlayerByID(ID1)
    let player2 = PlayerData.getPlayerByID(ID2)

    // if cannot found player1 or player2
    if (!player1 || !player2) throw new Error("Can't find player")

    // player1: given
    // player2: taken
    if (attacker.team === player1.team && attacker.team !== player2.team) {
        if (player1.heatlh <= 0) throw new Error("Teammate already dead")
        if (player2.health <= 0) throw new Error("Attacked player already dead")

        if (player1.frozen) throw new Error("Teammate frozen")
        if (player2.frozen) throw new Error("Attacked player frozen")

        player1.health++
        player2.health--

        if (player2.health === 0) return true
        else return false
    }

    // player1: taken
    // player2: given
    if (attacker.team === player2.team && attacker.team !== player1.team) {
        if (player1.health <= 0) throw new Error("Attacked player already dead")
        if (player2.heatlh <= 0) throw new Error("Teammate already dead")

        if (player1.frozen) throw new Error("Attacked player frozen")
        if (player2.frozen) throw new Error("Teammate frozen")

        player1.health--
        player2.health++

        if (player1.health === 0) return true
        else return false
    }
}

// sudden death
exports.SuddenDeath = () => {
    for (let player in PlayerData) {
        if (player.health > 1) player.health = 1
    }
}