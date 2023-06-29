import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, 'db.json')

const adapter = new JSONFile(file)
const defaultData = { PlayerData: [],  Teams: [], GameState: { "AllowEntry": true, "SuddenDeath": false }}
const db = new Low(adapter, defaultData)

await db.read()

export function resetDB(data = undefined) {
    if (data) db.data = data
    else db.data = defaultData

    db.write()
    return
}

export function getPlayerByID(id) {
    db.read()
    return db.data.PlayerData.find(player => player.id === id)
}

export function getGameState() {
    db.read()
    return db.data.GameState
}

export function updatePlayer(newPlayerData) {
    db.read()
    const { PlayerData, Teams } = db.data
    if (!player) return false

    let teamChanged = false
    PlayerData = PlayerData.map(oldPlayerData => {
        if (oldPlayerData.id === newPlayerData.id) {
            teamChanged = oldPlayerData.team === newPlayerData.team
            return newPlayerData
        }
        else {
            return oldPlayerData
        }
    })
    if (teamChanged) {
        if (!Teams.includes(newPlayerData.team)) Teams.push(newPlayerData.team)
        
        PlayerData.sort((a, b) => {
            const aIndex = Teams.findIndex(a.team)
            const bIndex = Teams.findIndex(b.team)
    
            return (aIndex - bIndex)
        })
    }

    db.write()
    return newPlayerData
}

export function updateGameState(newState) {
    db.read()
    db.data.GameState = newState
    db.write()
}

export function updateData(newData) {
    db.data = newData
    db.write()
}

// query = "all" | "alive" | "dead" | id
export function getData(query="") {
    db.read()
    const { PlayerData } = db.data
    if (query === "all") {
        return PlayerData
    }
    if (query === "alive") {
        return PlayerData.map(player => player.health > 0)
    }
    if (query === "dead") {
        return PlayerData.map(player => player.health <= 0)
    }
    return getPlayerByID(id)
}

// register a player to the game
export function RegisterNewPlayer(nickname, team, id=undefined, health=5, score=0) {
    const { PlayerData, Teams, GameState } = db.data

    // if admin closed the game registering
    if (!GameState.AllowEntry) return false

    // if the player already exists
    for (let player of PlayerData) {
        if (player.id === id) return false
    }

    // register new team if it doesn't exist
    if (!Teams.includes(team)) {
        Teams.push(team)
    }

    // add player to the data
    PlayerData.push({
        "nickname": nickname,
        "id": id,
        "team": team,
        "health": health,
        "score": score,
        "frozen": false
    })

    // sort
    PlayerData.sort((a, b) => {
        const aIndex = Teams.indexOf(a.team)
        const bIndex = Teams.indexOf(b.team)

        return (aIndex - bIndex)
    })

    db.write()

    return id
}

export default db