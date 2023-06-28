const Game = require("./data.js")

// reset whole game
exports.ResetGame = (playerData=undefined) => {
    if (playerData) Game = playerData
    else Game = []

    Game.State.AllowEntry = true

    console.log("Game reset.")
}

// player jump in the game
exports.AddPlayer = (playerName, team, health=5) => {
    const Teams = ["Red", "Orange", "Amber", "Olive", "Aqua", "Teal", "Violet", "Pink"]
    if (!Teams.includes(team)) team = "???"

    const id =  Game.RegisterNewPlayer(playerName, team, health=health)
    return id
}

// doesn't consider cooldown but consider frozen state
// return whether it's a kill or not
// TODO: error handling (putting it here for now)
exports.GNT = (attackerID, ID1, ID2) => {
    let attacker = Game.getPlayerByID(attackerID)
    let player1 = Game.getPlayerByID(ID1)
    let player2 = Game.getPlayerByID(ID2)

    // if the attacker is frozen
    if (attacker.frozen) {
        attacker.frozen = false
        throw new Error("Attacker frozen")
    }

    // if cannot found player1 or player2
    if (!player1 || !player2) throw new Error("Can't find player")

    // player1: given
    // player2: taken
    if (attacker.team === player1.team && attacker.team !== player2.team) {
        if (player1.heatlh <= 0) throw new Error("Teammate already dead")
        if (player2.health <= 0) throw new Error("Attacked player already dead")

        if (player1.frozen) throw new Error("Teammate frozen")
        if (player2.frozen) throw new Error("Attacked player frozen")

        if (!Game.State.SuddenDeath) player1.health++
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
        if (!Game.State.SuddenDeath) player2.health++

        if (player1.health === 0) return true
        else return false
    }

    return Error("Team mismatch")
}

// sudden death
exports.SuddenDeath = () => {
    for (let player in Game) {
        if (player.health > 1) player.health = 1
    }
    Game.State.SuddenDeath = true
}