const PlayerData = require("./data.js")

// health

exports.AddHealth = (id, health_add) => {
    let player = PlayerData.getPlayerByID(id)
    player.health = player.health + health_add
}

exports.RemoveHealth = (id, health_remove) => {
    let player = PlayerData.getPlayerByID(id)
    player.health = player.health - health_remove
}

exports.SetHealth = (id, newHealth) => {
    let player = PlayerData.getPlayerByID(id)
    player.health = newHealth
}

// frozen states

exports.Freeze = (id) => {
    let player = PlayerData.getPlayerByID(id)
    player.frozen = true
}

exports.Defrost = (id) => {
    let player = PlayerData.getPlayerByID(id)
    player.frozen = false
}

exports.SetFrozenState = (id, newFrozenState) => {
    let player = PlayerData.getPlayerByID(id)
    player.frozen = newFrozenState
}

// score

exports.AddScore = (id, added) => {
    let player = PlayerData.getPlayerByID(id)
    player.score = player.score + added
}

exports.RemoveScore = (id, removed) => {
    let player = PlayerData.getPlayerByID(id)
    player.score = player.score - removed
}

exports.SetScore = (id, newScore) => {
    let player = PlayerData.getPlayerByID(id)
    player.score = newScore
}

// useful when a player is dead
exports.GiveActivePlayerScore = (added) => {
    for (let player of PlayerData) {
        if (player.health > 0 && !player.frozen) {
            player.health += added
        }
    }
}

// misc

exports.closeEntry = () => PlayerData.EntryClosed = true
exports.openEntry = () => PlayerData.EntryClosed = false

// set player nickname, could be useful if they have weird nickname
exports.SetNickname = (id, newName) => {
    let player = PlayerData.getPlayerByID(id)
    player.nickname = newName
}

// set player team, totally no use unless there's bugs or mistakes
exports.SetTeam = (id, newTeam) => {
    let player = PlayerData.getPlayerByID(id)
    player.team = newTeam
}

// set player id, totally no use unless there's bugs
exports.SetID = (id, newID) => {
    let player = PlayerData.getPlayerByID(id)
    player.id = newID
}

// reassign both health and score to another person
exports.ReassignData = (id, newID, newName) => {
    let player = PlayerData.getPlayerByID(id)
    player.id = newID
    player.nickname = newName
}

// move health to another person without removing original player's score
exports.InheritHealth = (id, newID, newName) => {
    let originalPlayer = PlayerData.getPlayerByID(id)
    PlayerData.RegisterNewPlayer(newName, newID, originalPlayer.team, originalPlayer.health, 0)
    originalPlayer.health = 0
}