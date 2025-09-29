const blogRouter = require('express').Router()
const { response } = require('../app')
const Blo = require('../models/blog')


blogRouter.get('/', (request, response,) => {
    Blo.find({})
        .then((blogs) => {
            response.json(blogs)
        })
})

blogRouter.post('/', (request, response, next) => {
    const body = request.body

    const blog = new Blo({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.number,
    })

    blog.save()
        .then((savedBlog) => {
            response.status(201).json(savedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogRouter