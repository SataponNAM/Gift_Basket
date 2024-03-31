const User = require('../models/userModels.jsx')
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')

// get all user 
// route GET /users
const getAllUsers = asyncHandler (async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users.length){
        return res.status(400).json({ message : 'No users found'})
    }
    res.json(users)
})

// route POST /users
const createNewUser = asyncHandler (async (req, res) => {
    const { firstname, lastname, email, password, phone ,roles } = req.body

    // confirm data
    if(!firstname || !lastname || !email || !password || !phone || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message : 'All fields are required'})
    }

    // check fro duplicate
    const duplicate = await User.findOne({ email }).lean().exec()

    if(duplicate){
        return res.status(409).json({ message : 'Email is used'})
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10) // 10 salt

    const userObject = { firstname, lastname ,email, "password" : hashPassword,phone ,roles}

    // create and store user
    const user = await User.create(userObject)

    if(user) {
        // create
        res.status(201).json({ message: `New user ${firstname} ${lastname} created`})
    } else {
        res.status(400).json({ message : 'Invalid user data recieved'})
    }
})

// update user
// route PATCH /users
const updateUser = asyncHandler (async (req, res) => {
    const { id, firstname, lastname, email, phone ,roles, password} = req.body

    // confirm data
    if(!id || !email || !firstname || !lastname || !phone || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message : 'All field are required'})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({ message: "User not found"})
    }

    // check duplicate
    const duplicate = await User.findOne({ email }).lean().exec()

    // Allow update
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(400).json({ message: "Duplicate email"})
    }

    user.firstname = firstname
    user.lastname = lastname
    user.email = email
    user.phone = phone
    user.roles = roles

    if(password){
        // Hash password
        user.password = await bcrypt.hash(password, 10) // 10 salt
    }

    const updatedUser = await user.save()

    res.json({ message: "Updated successful" })
})

// delete user
// route DELETE /users
const deleteUser = asyncHandler (async (req, res) => {
    const { id } = req.body

    if(!id){
        return res.status(400).json({ message: 'User ID required'})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({ message: "User not found"})
    }

    const result = await user.deleteOne()

    const reply = `User deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}