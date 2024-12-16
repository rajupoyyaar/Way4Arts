const JWT = require('jsonwebtoken')

const generateToken = (id)=>{
    return JWT.sign({id}, process.env.SECRET_KEY,{
        expiresIn: "30d"
    })
}

module.exports = generateToken