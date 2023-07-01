import { ResetGame, AddPlayer } from "../../gnt/gnt.js";
import * as Utils from "../../gnt/util.js";

export function run(message) {
    switch (message[0]) {
        case "start":
            ResetGame();
            return true
        case "heal":
            
        case "add":
            if (!message[1] || !message[2]) return false
            if (!message[3]) AddPlayer(message[1], message[2])
            else AddPlayer(message[1], message[2], message[3])
            return true
            
    }
}