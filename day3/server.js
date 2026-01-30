const express = require("express");

let app = express()

let notes = []

app.use(express.json())

app.post("/notes", (req, res) => {
    notes.push(req.body)
    res.send("notes created")
})

app.get("/notes", (req, res) => {
    res.send(notes)
})

app.listen(3000, () => {
    console.log("Server Started")
})