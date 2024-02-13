const express = require('express')
const router = express.Router()
const authController = require('../controller/authController.jsx')
const loginLimiter = require('../middleware/loginLimiter.jsx')

router.route('/')
    .post(loginLimiter, authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

module.exports = router