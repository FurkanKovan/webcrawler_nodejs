const { test, expect } = require('@jest/globals')
const { standardizeURL } = require('./crawl.js')
const { getURLsFromHTML } = require('./crawl.js')

test('standardizeURL remove protocol', () => {
    const input = 'https://test.example.com/path'
    const actual = standardizeURL(input)
    const expected = 'test.example.com/path'
    expect(actual).toEqual(expected)
})

test('standardizeURL another protocol', () => {
    const input = 'http://test.example.com/path'
    const actual = standardizeURL(input)
    const expected = 'test.example.com/path'
    expect(actual).toEqual(expected)
})

test('standardizeURL remove trailing slash', () => {
    const input = 'https://test.example.com/path/'
    const actual = standardizeURL(input)
    const expected = 'test.example.com/path'
    expect(actual).toEqual(expected)
})

test('standardizeURL case-sensivity', () => {
    const input = 'https://test.EXAMPLE.com/path/'
    const actual = standardizeURL(input)
    const expected = 'test.example.com/path'
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute urls', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://test.example.com/path/"> Test html body </a>
    </body>
</html>`
    const inputBaseURL = 'https://test.example.com/path/'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://test.example.com/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML relative urls', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="/path/"> Test html body </a>
    </body>
</html>`
    const inputBaseURL = 'https://test.example.com'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://test.example.com/path/"]
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid path', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="invalid"> Test html body </a>
    </body>
</html>`
    const inputBaseURL = 'https://test.example.com'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})

test('getURLsFromHTML multiple urls', () => {
    const inputHTMLBody = `
<html>
    <body>
        <a href="https://test.example.com/path/"> Test html body </a>
        <a href="https://test.example.com/path1/"> Test html body path 1 </a>
        <a href="https://test.example.com/path2/"> Test html body path 2 </a>
    </body>
</html>`
    const inputBaseURL = 'https://test.example.com'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://test.example.com/path/", "https://test.example.com/path1/", "https://test.example.com/path2/"]
    expect(actual).toEqual(expected)
})
