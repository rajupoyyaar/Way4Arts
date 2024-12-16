const mongoose = require('mongoose')

const ArtModel = mongoose.Schema(
    {
        category:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        art:{
            type: String,
            required: true
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Artist"
        },
        userName:{
            type: String,
            required: true,
            ref: "Artist"
        }
    },
    {
        timeStamps: true
    }
)

const Art = mongoose.model('Art', ArtModel)
module.exports = Art
