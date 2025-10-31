const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const api = supertest(app)



beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlog)
})

test('blogs are returneed as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlog.length)
})

test('a valid blog can be added and content saved correctly', async () => {
    const newBlog = {
        title: 'I am the one',
        author: 'Roudne Erern',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 10
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    const createdBlog = response.body;
    assert.strictEqual(createdBlog.title, newBlog.title, 'Title mismatch');
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length + 1)

})

test('likes property is set to default 0', async () => {
    const newBlog = {
        title: 'I am the one',
        author: 'Roudne Erern',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const createdBlog = response.body
    assert.strictEqual(createdBlog.likes, 0, 'likes did not default to 0')

})


test('unique identifier property is id instead of default _id', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
    const blogs = response.body
    const allHaveId = blogs.every(blog => blog.id && !blog._id);
    assert.strictEqual(allHaveId, true)
    assert.ok(blogs[0].id, 'First blog does not have id');
    assert.strictEqual(blogs[0]._id, undefined, 'First blog still has _id');
})

test('title and url properties are missing', async () => {
    const newBlog = {
        author: 'Roudne Erern',
        title: 'We are the champions',
        likes: 10
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
    assert.strictEqual(response.status, 400, 'Blog without title or url should return 400')
})

test('a blog be deleted', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToDelete = blogAtStart[0]
    const response = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(n => n.title)
    assert(!titles.includes(blogToDelete.title))
    assert.strictEqual(blogsAtEnd.length, helper.initialBlog.length - 1)
})

test('likes of a blog can be updated', async () => {
    const updatedLikes = {
        likes: 12912
    }
    const blogAtStart = await helper.blogsInDb()
    const blogToUpdate = blogAtStart[0]
    const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedLikes)
        .expect(200)
    assert.strictEqual(response.body.likes, updatedLikes.likes)
    assert.strictEqual(response.body.id, blogToUpdate.id)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd.find(b => b.id === blogToUpdate.id)

    assert.strictEqual(updatedBlog.likes, updatedLikes.likes)


})

test('returns 404 if blog does not exist', async () => {
    const validNonExistingId = await helper.nonExixtingId()

    await api
        .put(`/api/blogs/${validNonExistingId}`)
        .send({ likes: 13 })
        .expect(404)
})

test('returns 400 for invalid id', async () => {
    const invalId = '690494e68135b4a01446a5dw'
    await api
        .put(`/api/blogs/${invalId}`)
        .send({ likes: 12 })
        .expect(400)
})




after(async () => {
    await mongoose.connection.close()
})