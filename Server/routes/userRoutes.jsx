const express = require('express')
const router = express.Router()
const usersController = require('../controller/userController.jsx')
const veriftJWT = require('../middleware/verifyJWT.jsx')

router.use(veriftJWT)

router.route('/')
    .get(usersController.getAllUsers)
    .post(usersController.createNewUser)
    .patch(usersController.updateUser)
    .delete(usersController.deleteUser)

module.exports = router