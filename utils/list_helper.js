const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    const reducer = (max, blog) => {
        return blog.likes > max.likes ? blog : max
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer)

}

// return the blog with the most blogs
const findMostAuthor = (blogs) => {
    const authorCount = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1
        return acc
    }, {})

    const [author, blogsCount] = Object.entries(authorCount).reduce(
        (max, current) => (current[1] > max[1] ? current : max),
        ['', 0]
    )
    return {
        author: author,
        blogs: blogsCount
    }
}

const mostLikedBlogs = (blogs) => {
    const authorCount = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes
        return acc
    }, {})

    const [author, totalLikes] = Object.entries(authorCount).reduce(
        (max, current) => (current[1] > max[1] ? current : max),
        ['', 0]
    )
    return {
        author: author,
        likes: totalLikes
    }
}





module.exports = { dummy, totalLikes, favoriteBlog, findMostAuthor, mostLikedBlogs }