const jwt = require('jsonwebtoken')
const Artist = require('../Models/ArtistModel')
const Customer = require('../Models/CustomerModel');
const asyncHandler = require('express-async-handler')

const protect = asyncHandler(async(req,res,next)=>{
let token;
if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
     try{
        token = req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userId =await Artist.findById(decoded.id).select("-password")
        next()
     }
     catch(error){
        res.status(400)
        throw new Error("No Authorized token")
     }
}
else{
    res.status(400)
    throw new Error("No token please add token")
}
})


const protectCustomer = asyncHandler(async (req, res, next) => {
   let token;

   if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       try {
           token = req.headers.authorization.split(' ')[1];
           const decoded = jwt.verify(token, process.env.SECRET_KEY);

           // Attach customer to request
           req.userId = await Customer.findById(decoded.id).select('-password');
           next();
       } catch (error) {
           res.status(401);
           throw new Error('Not authorized, token failed');
       }
   }

   if (!token) {
       res.status(401);
       throw new Error('Not authorized, no token');
   }
});

module.exports ={protect, protectCustomer}
