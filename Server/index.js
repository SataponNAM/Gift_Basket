require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger.jsx')
const errorHandler = require('./middleware/errorHandler.jsx')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOption = require('./config/corsOption.jsx')
const connectDB = require('./config/dbConnection.jsx')
const mongoose = require('mongoose')
const { logEvents } = require('./middleware/logger.jsx')

const PORT  = process.env.PORT || 3001

console.log(process.env.NODE_ENV)

connectDB()

app.use(logger)
app.use(cors(corsOption))
app.use(express.json())
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root.jsx'))
app.use('/users', require('./routes/userRoutes.jsx'))
app.use('/auth', require('./routes/authRoutes.jsx'))

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connect to mongoDB')
    app.listen(PORT, () => 
        console.log(`Server is running on port ${PORT}`)
    )
})

mongoose.connection.on('error', err => {
    console.log(err)
    // create file 
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 
    'mongoErrlog.log')
})
