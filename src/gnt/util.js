import { getPlayerByID, getGameState, updatePlayer, updateGameState, RegisterNewPlayer, getData } from "./data.js"

// find player

export function HasPlayer(id) {
    const PlayerData = getData("all")
    for (let player of PlayerData) {
        if (player.id === id) {
            return true
        }
    }
    return false
}

export function FindIDByName(name) {
    const PlayerDatas = getData("all")
    for (let player of PlayerDatas) {
        if (player.nickname === name) {
            return player.id
        }
    }
}

export function FindPlayerByName(name) {
    const PlayerDatas = getData("all")
    for (let player of PlayerDatas) {
        if (player.nickname === name) {
            return player
        }
    }
}

// health

export function AddHealthByID(id, healthAdd) {
    let player = getPlayerByID(id)
    player.health = player.health + healthAdd
    updatePlayer(player)
}

export function RemoveHealthByID(id, healthRemove) {
    let player = getPlayerByID(id)
    player.health = player.health - healthRemove
    updatePlayer(player)
}

export function AddHealth(playerStat, healthAdd) {
    playerStat.health = playerStat.health + healthAdd
    updatePlayer(playerStat)
}

export function RemoveHealth(playerStat, healthRemove) {
    playerStat.health = playerStat.health - healthRemove
    updatePlayer(playerStat)
}

export function SetHealth(id, newHealth) {
    let player = getPlayerByID(id)
    player.health = newHealth
    updatePlayer(player)
}

export function IsAlive(id) {
    let player = getPlayerByID(id)
    return (player.health > 0)
}

// frozen states

export function IsFrozenByID(id) {
    let playerStat = getPlayerByID(id)
    return IsFrozen(playerStat)
}

export function IsFrozen(playerStat) {
    var lastGNT = playerStat.lastGNT
    var twentyMinutesLater = lastGNT + (20 * 60 * 1000)
    return twentyMinutesLater < new Date().getTime()
}

export function Freeze(id) {
    let player = getPlayerByID(id)
    player.lastGNT = 0
    updatePlayer(player)
}

export function Unfreeze(id) {
    let player = getPlayerByID(id)
    player.lastGNT = new Date().getTime()
    updatePlayer(player)
}

export function SetFrozenState(id, newFrozenState) {
    if (newFrozenState) Freeze(id)
    else Unfreeze(id)
}

// score

export function AddScore(id, added) {
    let player = getPlayerByID(id)
    player.score = player.score + added
    updatePlayer(player)
}

export function RemoveScore(id, removed) {
    let player = getPlayerByID(id)
    player.score = player.score - removed
    updatePlayer(player)
}

export function SetScore(id, newScore) {
    let player = getPlayerByID(id)
    player.score = newScore
    updatePlayer(player)
}

// misc

export function CloseEntry() {
    let state = getGameState()
    state.AllowEntry = false
    updateGameState(state)
}

export function OpenEntry() {
    let state = getGameState()
    state.AllowEntry = true
    updateGameState(state)
}

// set player nickname, could be useful if they have weird nickname
export function SetNickname(id, newName) {
    let player = getPlayerByID(id)
    player.nickname = newName
    updatePlayer(player)
}

// set player team, totally no use unless there's bugs or mistakes
export function SetTeam(id, newTeam) {
    let player = getPlayerByID(id)
    player.team = newTeam
    updatePlayer(player)
}

// move health to another person (replace their original health) without removing original player's score
export function InheritHealth(id, newID, newName) {
    let originalPlayer = getPlayerByID(id)
    let newPlayer = getPlayerByID(newID)

    if (newPlayer === undefined) {
        RegisterNewPlayer(newName, newID, originalPlayer.team, originalPlayer.health, 0)
    }
    else {
        newPlayer.health = originalPlayer.health
        updatePlayer(newPlayer)
    }

    originalPlayer.health = 0
    updatePlayer(originalPlayer)
}