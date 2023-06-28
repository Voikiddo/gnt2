const Game = require("./data.js")

// health

exports.AddHealth = (id, health_add) => {
    let player = Game.getPlayerByID(id)
    player.health = player.health + health_add
}

exports.RemoveHealth = (id, health_remove) => {
    let player = Game.getPlayerByID(id)
    player.health = player.health - health_remove
}

exports.SetHealth = (id, newHealth) => {
    let player = Game.getPlayerByID(id)
    player.health = newHealth
}

// frozen states

exports.Freeze = (id) => {
    let player = Game.getPlayerByID(id)
    player.frozen = true
}

exports.Defreeze = (id) => {
    let player = Game.getPlayerByID(id)
    player.frozen = false
}

exports.SetFrozenState = (id, newFrozenState) => {
    let player = Game.getPlayerByID(id)
    player.frozen = newFrozenState
}

// score

exports.AddScore = (id, added) => {
    let player = Game.getPlayerByID(id)
    player.score = player.score + added
}

exports.RemoveScore = (id, removed) => {
    let player = Game.getPlayerByID(id)
    player.score = player.score - removed
}

exports.SetScore = (id, newScore) => {
    let player = Game.getPlayerByID(id)
    player.score = newScore
}

// useful when a player is dead
exports.GiveActivePlayerScore = (added) => {
    for (let player of Game) {
        if (player.health > 0 && !player.frozen) {
            player.health += added
        }
    }
}

// misc

exports.CloseEntry = () => Game.State.AllowEntry = false
exports.OpenEntry = () => Game.State.AllowEntry = true

// set player nickname, could be useful if they have weird nickname
exports.SetNickname = (id, newName) => {
    let player = Game.getPlayerByID(id)
    player.nickname = newName
}

// set player team, totally no use unless there's bugs or mistakes
exports.SetTeam = (id, newTeam) => {
    let player = Game.getPlayerByID(id)
    player.team = newTeam
}

// set player id, totally no use unless there's bugs
exports.SetID = (id, newID) => {
    let player = Game.getPlayerByID(id)
    player.id = newID
}

// reassign both health and score to another person
exports.ReassignData = (id, newID, newName) => {
    let player = Game.getPlayerByID(id)
    player.id = newID
    player.nickname = newName
}

// move health to another person (replace their original health) without removing original player's score
exports.InheritHealth = (id, newID, newName) => {
    let originalPlayer = Game.getPlayerByID(id)
    let newPlayer = Game.getPlayerByID(newID)

    if (newPlayer === undefined) Game.RegisterNewPlayer(newName, newID, originalPlayer.team, originalPlayer.health, 0)
    else newPlayer.health = originalPlayer.health

    originalPlayer.health = 0
}