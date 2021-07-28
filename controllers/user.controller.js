const User = require('../models/User')
const { registerValidation, loginValidation } = require('../middleware/auth.middle')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Controller create data
exports.create = async (req, res) => {
    // Validation
    const { error } = registerValidation(req.body)

    if (error)
        return res.status(400).send(error.details[0].message)


    // Check if the user already in database
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist)
        return res.status(400).send('Email already exist')

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (err) {
        res.status(400).send({
            message:
                err.message || "Some error while creating data"
        })
    }
}

exports.findAll = async (req, res) => {
    User.find()
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(500).send({
                message:
                    err.message || "some error while retrieving data"
            })
        });
}

exports.login = async (req, res) => {
    // Validation
    const { error } = loginValidation(req.body)

    if (error)
        return res.status(400).send(error.details[0].message)

    // Check if the user already in database
    const user = await User.findOne({ email: req.body.email })
    if (!user)
        return res.status(400).send('Email is not found')

    // Cheeck if password correct
    const validPass = await bcrypt.compare(req.body.password, user.password)
    if (!validPass)
        return res.status(400).send('Invalid Password')

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)
}

exports.findOne = async (req, res) => {
    const id = req.params.id

    User.findById(id)
        .then((result) => {
            res.send(result)
        }).catch((err) => {
            res.status(409).send({
                message:
                    err.message || "Some error while find data"
            })
        });
}