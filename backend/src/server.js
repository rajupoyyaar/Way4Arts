const express = require('express')
const connectDB = require('./Config/db')
const cors = require('cors')
const artistRegisterRouter = require('./Router/artistRegisterRouter')
const artUploadRouter = require('./Router/artUploadRouter')
const customerRouter = require('./Router/CustomerRouter')
const {notFound, errorHandler} = require('./Middleware/ErrorHandler')
const app = express()
const port = 5002

connectDB()

app.use(cors())

app.get("/", (req,res)=>{
    res.send("Hello world")
})

app.use(express.json())
app.use('/artist', artistRegisterRouter)
app.use('/art', artUploadRouter)
app.use('/customers', customerRouter)
app.use(notFound)
app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`App is running successfully on ${port}`)
})
