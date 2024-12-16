const asyncHandler = require('express-async-handler')
const Artist = require('../Models/ArtistModel')
const generateToken = require('../Utils/GenerateToken')

const artistRegister = asyncHandler(async (req,res)=>{
   const {name,email,phone,profile,password} = req.body

   const artistExist = await Artist.findOne({email})

   if(artistExist){
     res.status(400)
     throw new Error('Artist already Exists')
   }

   const artist = await Artist.create({name,email,phone,profile,password})

   if(artist){
      res.status(200).json({
        _id: artist._id,
        name: artist.name,
        email: artist.email,
        phone: artist.phone,
        profile: artist.profile,
        password: artist.password,
        token: generateToken(artist._id)
      })
   }
   else{
    res.status(400)
    throw new Error('Error Occured')
   }
})

const artistLogin = asyncHandler(async (req,res)=>{
    const {email,password} = req.body

    const artist =await  Artist.findOne({email})
    if(artist && (await artist.matchPassword(password))){
        res.status(200).json({
            _id: artist._id,
            name: artist.name,
            email: artist.email,
            phone: artist.phone,
            profile: artist.profile,
            password: artist.password,
            token: generateToken(artist._id)
        })
    }
    else{
        res.status(400)
        throw new Error('Invalid User')
    }
})
module.exports = {artistRegister, artistLogin}
