// server stuff, to scam the container
const express = require("express");
const path = require('path')
const { log } = require('node:console');
const PlayerData = require("../gnt/data.js")
const app = express();
const port = 8080;

exports.StartServer = () => {
    app.get("/", function (req, res) {
        res.redirect('https://give-and-take-v2.glitch.me/')
    });
    
    app.get("/data/", function (req, res) {
        res.json(PlayerData.getData("all"));
    });
    
    app.get("/data/:query/", function (req, res) {
        const query = req.params.query
        const result = PlayerData.getData(query)
        if (!result) res.status(400).json({ message: `Query invalid: acceptable queries are "all", "alive", "dead", and playerID, get ${query} instead` })
        res.json(result)
    });

    app.get("/admin", (req,res) => {
        res.status(400).send("missing token...")
    })

    app.get("/admin/:token", function (req,res) {
        const token = req.params.token
        if (token === process.env.ADMIN_TOKEN){
            res.sendFile(__dirname+'/admin_panel/admin_panel.html')
        }
        else
        {
            res.status(401).send("invalid token...")
        }
    })

    app.get("/assets/admin_panel.js", (req, res) => {
        res.sendFile(__dirname+'/admin_panel/admin_panel.js')
    })
    
    app.listen(port, function () {
        console.log(`App listening on port ${port}!`);
    });
}