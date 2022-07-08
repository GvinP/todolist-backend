const Router = require("express");
const {check} = require("express-validator");
const controller = require('./authController.js')
const authMiddleware = require('./middlewares/authMiddleware')

const router = new Router()

router.post('/registration',[
    check('username', 'User name can\'t be empty').notEmpty(),
    check('password', 'Use between 4 and 10 characters for your password').isLength({min: 4, max: 10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', authMiddleware, controller.getUsers)

module.exports = router