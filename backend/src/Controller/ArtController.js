const asyncHandler = require('express-async-handler')
const Art = require('../Models/ArtModel')

const createArt = asyncHandler(async(req,res)=>{
    const {category,price,art} = req.body

    if(!category || !price || !art){
        res.status(400)
        throw new Error("Please fill all the fields")
    }
    else{
        const _art = new Art({userId:req.userId._id, userName:req.userId.name, category,price,art})
        const createdArt = _art.save()
        res.status(201).json(createdArt)
    }
})

const fetchArt = asyncHandler(async(req,res)=>{
   const allPaintings = await Art.find({})
   if(allPaintings && allPaintings.length >= 1){
    res.status(200).json(allPaintings)
   }
   else{
    res.status(400)
    throw new Error("No paintings available")
   }
})

module.exports = {createArt, fetchArt }