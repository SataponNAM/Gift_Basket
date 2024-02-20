const express = require('express')
const router = express.Router()
const addressController = require('../controller/addressController.jsx')
const veriftJWT = require('../middleware/verifyJWT.jsx')

router.use(veriftJWT)

router.route('/')
    .get(addressController.getAddress)
    .post(addressController.addAddress)
    .delete(addressController.deleteAddress)

module.exports = router