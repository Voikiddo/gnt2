import { ResetGame, AddPlayer } from "../../gnt/gnt.js";
import ADMIN_QOL from "../../gnt/admin_qol.js";

export function run(message) {
    switch (message[0]) {
        case "start":
            ResetGame();
            return true
        case "add":
            if (!message[1] || !message[2]) return false
            if (!message[3]) AddPlayer(message[1], message[2])
            else AddPlayer(message[1], message[2], message[3])

            
    }
}