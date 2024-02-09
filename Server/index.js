const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

//mongoose.connect('mongodb+srv://sataponsf:0922760039@giftbasket.4nq08td.mongodb.net/')

app.listen(3001, () => {
    console.log('Server is running')
})