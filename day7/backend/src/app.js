const express = require('express')
const app = express()
const dataModel = require('./models/data.models.js')

const cors = require('cors')

app.use(express.json())

app.use(cors())

app.use(express.static('public'))

app.post("/api/data", async (req, res)=>{

    const {title, description} = req.body;

    const data = await dataModel.create({title, description})

    res.status(201).json({
        message: "Data created successfully",
        data
    })
})

app.get("/api/data", async (req, res)=>{

    const data = await dataModel.find()

    res.status(200).json({
        message: "Data fetched successfully",
        data
    })
})

app.delete("/api/data/:id", async (req, res)=>{
    const id = req.params.id
    await dataModel.findByIdAndDelete(id)
    res.status(200).json({
        message: "data deleted successfully"
    })
})

app.use("*name", (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "/public/index.html"))
})

module.exports = app;