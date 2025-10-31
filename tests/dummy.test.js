const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

//dummy
describe('dummy', () => {

    test('returns one', () => {
        const blogs = []
        const result = listHelper.dummy(blogs)
        assert.strictEqual(result, 1)
    })
})

//total likes
describe('total likes', () => {
    const blogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 4,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 1,
        }
    ]
    test('when list has only one blog, equals the likes of that',
        () => {
            const result = listHelper.totalLikes(blogs)
            assert.strictEqual(result, 10)
        })
})

//favourite likes
describe('favLike', () => {
    const blogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 1,
        }
    ]
    test('the max like',
        () => {
            const result = listHelper.favoriteBlog(blogs)
            assert.deepStrictEqual(
                result,
                {
                    _id: '5a422aa71b54a676234d17f8',
                    title: 'Go To Statement Considered Harmful',
                    author: 'Edsger W. Dijkstra',
                    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
                    likes: 5
                }
            )
        })
})

//largestBlog
describe('largestBlog', () => {
    const blogs = [
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
        },
        {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 1,
        }
    ]

    test('author with largest number of blogs', () => {
        const result = listHelper.findMostAuthor(blogs)
        assert.deepStrictEqual(result, {
            author: 'Edsger W. Dijkstra',
            blogs: 3
        })

    })
})

//mostLikes
describe('mostLikes', () => {
    const blogs = [
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 1,
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Bishal',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 100,
        }
    ]
    test('author with most number of likes', () => {
        const result = listHelper.mostLikedBlogs(blogs)
        assert.deepStrictEqual(result, {
            author: 'Bishal',
            likes: 100
        })

    })
})