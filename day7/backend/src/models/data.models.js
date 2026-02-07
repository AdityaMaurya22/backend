const mongoose = require('mongoose')

const dataSchema = new mongoose.Schema({
    title : String,
    description : String
})

const dataModel = mongoose.model("Data", dataSchema)

module.exports = dataModel;