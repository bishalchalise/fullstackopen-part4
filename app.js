const express = require('express')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

const app = express()

logger.info('Connecting to', config.MONGODB_URI)

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info("Connected to mongoDB")
    })
    .catch(error => {
        logger.error("Error connecting to mongoDB", error.message)
    })




app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs', blogRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


