const Blog = require('../models/blog')

const initialBlog = [
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
    },
    {
        title: 'Go To Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
    }
]

const nonExixtingId = async () => {
    const blog = new Blog({ title: 'fasefd' })
    await blog.save()
    await blog.deleteOne()
    return blog._id.toString()
}


const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())

}


module.exports = { initialBlog, nonExixtingId, blogsInDb, }