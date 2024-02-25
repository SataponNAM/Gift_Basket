const Address = require('../models/addressModels.jsx') 
const User = require('../models/userModels.jsx')
const asyncHandler = require('express-async-handler')

// Get all address 
//GET /address
// Private
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
// Private
const addAddress = asyncHandler (async (req, res) => {
    const { user, firstname, lastname ,address, province, district, subdistrict, postal ,phone ,isDefault } = req.body

    if (!user || !firstname || !lastname || !address || !province || !district || !subdistrict || !postal || !phone) {
        return res.status(400).json({ message : 'All fields are required.'})
    }

    const userObject = await User.findById(user)
    if (!userObject) {
        return res.status(404).json({ message: 'User not found.' })
    }

    // Create new address
    const addressObjects = { user, firstname, lastname, address, province, district, subdistrict, postal, phone, isDefault }
    const userAddress = Address.create(addressObjects)

    if(userAddress){
        res.status(201).json({ message: `New address is created.`})
    }else {
        res.status(400).json({ message : 'Invalid address data recieved.'})
    }
})

// update address
// PATCH /address
// Private
const updateAddress = asyncHandler(async (req, res) => {
    const { id, user, firstname, lastname, add, province, district, subdistrict, postal, phone, isDefault } = req.body;

    if (!user || !firstname || !lastname || !add || !province || !district || !subdistrict || !postal || !phone) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    if (!id) {
        return res.status(400).json({ message: 'Address ID required.' });
    }

    const address = await Address.findById(id).exec();

    if (!address) {
        return res.status(404).json({ message: 'User not found.' });
    }

    address.user = user;
    address.firstname = firstname;
    address.lastname = lastname;
    address.address = add;
    address.province = province;
    address.district = district;
    address.subdistrict = subdistrict;
    address.postal = postal;
    address.phone = phone;
    address.isDefault = isDefault;

    const updatedAddress = await address.save();

    res.json(`${updatedAddress.firstname} updated`);
});


// delete address
// DELETE /address
// Private
const deleteAddress = asyncHandler (async (req, res) => {
    const { id } = req.body

    if(!id){
        return res.status(400).json({ message: 'Address ID required.'})
    }

    const address = await Address.findById(id).exec()

    if(!address){
        return res.status(400).json({ message: "Address not found."})
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