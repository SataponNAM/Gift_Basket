require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const { logger, logEvents } = require('./middleware/logger.jsx')
const errorHandler = require('./middleware/errorHandler.jsx')

const corsOption = require('./config/corsOption.jsx')
const connectDB = require('./config/dbConnection.jsx')

const PORT = process.env.PORT || 3001

console.log(process.env.NODE_ENV)

connectDB()



app.use(logger)
app.use(cors(corsOption))
//app.use(express.raw({type: 'application/json'}))
app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/', express.static(path.join(__dirname, '/public')))

app.use('/', require('./routes/root.jsx'))
app.use('/users', require('./routes/userRoutes.jsx'))
app.use('/auth', require('./routes/authRoutes.jsx'))
app.use('/address', require('./routes/addressRoutes.jsx'))
app.use('/basket', require('./routes/basketRoutes.jsx'))
app.use('/decoration', require('./routes/decorationRoutes.jsx'))
app.use('/product', require('./routes/productRoutes.jsx'))
app.use('/card', require('./routes/cardRoutes.jsx'))
app.use('/giftbasket', require('./routes/giftBasketRoutes.jsx'))
app.use('/cart', require('./routes/cartRoutes.jsx'))
app.use('/order', require('./routes/orderRoutes.jsx'))
app.use('/webhook',express.raw({type: 'application/json'}), require('./routes/webhookRoutes.jsx'));

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
