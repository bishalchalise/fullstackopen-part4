const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)
const bcrypt = require('bcrypt')


describe('when there is only one user in db', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash })
        await user.save()
    })
    test('creation succeds with a fresh username', async () => {

        const userAtStart = await helper.usersInDb()

        const newUser = {
            name: 'dikshya',
            username: 'dikshya',
            password: 'bishal'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, userAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper message for duplicate username', async () => {
        const userAtStart = await helper.usersInDb()

        const newUser = {
            name: 'admin',
            username: 'root',
            password: '1234'
        }

        const res = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(userAtStart.length, usersAtEnd.length)

        assert(res.body.error.includes('expected `username` to be unique'))
    })

})

after(async () => {
    await mongoose.connection.close()
})