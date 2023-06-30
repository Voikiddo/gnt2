import { getPlayerByID, getGameState, updatePlayer, updateGameState, RegisterNewPlayer } from "./data.js"

// health

export function AddHealth(id, health_add) {
    let player = getPlayerByID(id)
    player.health = player.health + health_add
    updatePlayer(player)
}

export function RemoveHealth(id, health_remove) {
    let player = getPlayerByID(id)
    player.health = player.health - health_remove
    updatePlayer(player)
}

export function SetHealth(id, newHealth) {
    let player = getPlayerByID(id)
    player.health = newHealth
    updatePlayer(player)
}

// frozen states

export function IsFrozenByID(id) {
    let playerStat = getPlayerByID(id)
    return IsFrozen(playerStat)
}

export function IsFrozen(playerStat) {
    var lastGNT = playerStat.lastGNT
    var twentyMinutesLater = new Date(lastGNT + (20 * 60 * 1000))
    return twentyMinutesLater < new Date().getTime()
}

export function Freeze(id) {
    let player = getPlayerByID(id)
    player.lastGNT = 0
    updatePlayer(player)
}

export function Defreeze(id) {
    let player = getPlayerByID(id)
    player.lastGNT = Date.now()
    updatePlayer(player)
}

export function SetFrozenState(id, newFrozenState) {
    if (newFrozenState) Freeze(id)
    else Defreeze(id)
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
    let state = getGameState
    state.AllowEntry = false
    updateGameState(state)
}
export function OpenEntry() {
    let state = getGameState
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