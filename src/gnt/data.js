// health & scores
// I don't care enough to do sqlite but I probably should monkS
// and probably should do ts as well but I also don't care enough
let PlayerData = []
// let DefaultPlayer = {
//     "nickname": "",
//     "id": "",
//     "health": 5,
//     "score": 0,
//     "frozen": false
// }

exports.getPlayerByID = (id) => {
    return PlayerData.find(player => player.id === id)
}

exports.getData = (query="") => {
    // query = "all" | "alive" | "dead" | id
    if (query === "all") {
        return PlayerData
    }
    if (query === "alive") {
        return PlayerData.map(player => player.health > 0)
    }
    if (query === "dead") {
        return PlayerData.map(player => player.health <= 0)
    }
    if (query === "id") {
        return getPlayerByID(id)
    }
}

exports.EntryClosed = false

// register a player to the game
exports.RegisterNewPlayer = (nickname, id, team, health=5, score=0) => {
    const Teams = ["Red", "Orange", "Amber", "Olive", "Aqua", "Teal", "Violet", "Pink"]

    // if admin closed the game registering
    if (this.EntryClosed) return false

    // if the player already exists
    for (let player of PlayerData) {
        if (player.id === id) return false
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
        const aIndex = Teams.findIndex(a.team)
        const bIndex = Teams.findIndex(b.team)

        return (aIndex - bIndex)
    })

    return true
}