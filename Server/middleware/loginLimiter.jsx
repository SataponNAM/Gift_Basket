const rateLimit = require('express-rate-limit')
const { logEvents } = require('./logger.jsx')

const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 login request per window
    message:
        { message : 'Toomany login attempts from this IP'},
    handler: (req, res, next, options) => {
        logEvents(`Too many requests: ${options.message.message}\t${req.method}\t${req.url}
        \t${req.headers.origin}`, 'errLog.log')
        res.status(options.statusCode).send(options.message)
    },
    standardHeaders: true,
    legacyHeaders: false,
})

module.exports = loginLimiter