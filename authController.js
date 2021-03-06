const User = require("./models/User.js");
const Role = require("./models/Role.js");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {secret} = require('./config')
const {validationResult} = require('express-validator')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: 15*60})
}

class AuthController {
    async registration(req, res) {
        try {
            const error = validationResult(req)
            if (!error.isEmpty()) {
                return res.status(400).json({message: 'Registration error', error})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: 'That username is taken. Try another'})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json({message: 'User created'})
        } catch (e) {
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `User ${user} not found`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: 'Incorrect password'})
            }
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            res.status(400).json({message: 'Login error'})
        }
    }
    async logout(req, res) {
        try {
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        } catch (e) {
            res.status(400).json({message: 'Logout error'})
        }
    }

    async me(req, res) {
        try {
            const user = req.user
            res.json(user)
        } catch (e) {
            res.status(400).json({message: 'User is not authorized'})
        }
    }
}

module.exports = new AuthController()