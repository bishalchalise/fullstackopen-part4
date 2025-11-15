const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const user = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
    response.json(user)
})

usersRouter.post('/', async (request, response) => {

    const { name, username, password } = request.body

    if (!password || password.length < 3) {
        return response.status(400).json({ error: 'password should be provided with min length of 3' })
    }

    const saltRound = 10
    const passwordHash = await bcrypt.hash(password, saltRound)

    const newUser = new User({
        name, username, passwordHash
    })

    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter