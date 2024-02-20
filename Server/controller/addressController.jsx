const Address = require('../models/addressModels.jsx') 
const User = require('../models/userModels.jsx')
const asyncHandler = require('express-async-handler')

// Get all address 
//GET /address
const getAddress = asyncHandler ( async (req, res) => {
    const address = await Address.find().lean()

    if(!address.length){
        return res.status(400).json({ message : 'No address found'})
    }

    // 
    const addressWithUser = await Promise.all(address.map(async (address) => {
        const user = await User.findById(address.user).lean().exec()
        return { ...address, email: user.email}
    }))

    res.json(addressWithUser)
});

// Add address 
//POST /address
const addAddress = asyncHandler (async (req, res) => {
    const { user, address, city, state, country, isDefault } = req.body

    if (!user || !address || !city || !state || !country) {
        return res.status(400).json({ message : 'All fields are required'})
    }

    const userObjects = { user, address, city, state, country, isDefault }

    const userAddress = Address.create(userObjects)

    if(userAddress){
        res.status(201).json({ message: `New address is created`})
    }else {
        res.status(400).json({ message : 'Invalid address data recieved'})
    }
})

// update address
// PATCH /address
const updateAddress = asyncHandler (async (req, res) => {
    const { id ,user, address, city, state, country, isDefault } = req.body
})

// delete address
// DELETE /address
const deleteAddress = asyncHandler (async (req, res) => {
    const { id } = req.body

    if(!id){
        return res.status(400).json({ message: 'Address ID required'})
    }

    const address = await Address.findById(id).exec()

    if(!address){
        return res.status(400).json({ message: "Address not found"})
    }

    const result = await address.deleteOne()

    const reply = `Address deleted`

    res.json(reply)
})

module.exports = {
    getAddress,
    addAddress,
    updateAddress,
    deleteAddress
}