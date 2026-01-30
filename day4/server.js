const express = require("express")

let app = express()

app.use(express.json())

let notes = []

app.post("/notes", (req,res)=>{
    notes.push(req.body)
    res.send("Notes Created")
})

app.get("/notes", (req,res)=>{
    res.send(notes)
})

app.delete("/notes/:id", (req,res)=>{
   delete notes[req.params.id]
    res.send("Deleted")
})

app.patch("/notes/:id", (req,res)=>{
    notes[req.params.id].description = req.body.description
    res.send("node updated")
})

app.listen(3000, ()=>{
    console.log("server started")
})