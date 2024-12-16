const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const artistModel = mongoose.Schema(
    {
       name: {
        type: String,
        required: true
       },
       email: {
        type: String,
        require: true,
        unique: true
       },
       phone: {
        type: Number,
        required: true,
       },
       profile: {
        type: String,
        required: true,
        default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
       },
       isAdmin:{
         type: Boolean,
         required: true,
         default: false
       },
       password: {
        type: String,
        required: true,
       }
    },
    {
        timestamps: true
    }
)
artistModel.pre("save", async function(next){
   if(!this.isModified("password")){
    next()
   }
   const salt = await bcrypt.genSalt(10)
   this.password =await bcrypt.hash(this.password,salt)
})

artistModel.methods.matchPassword = async function (enteredPassword){
   return await bcrypt.compare(enteredPassword,this.password)
}

const Artist = mongoose.model('Artist', artistModel)
module.exports = Artist
