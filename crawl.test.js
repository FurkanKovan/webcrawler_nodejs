const { test, expect } = require('@jest/globals')
const { standardizeURL } = require('./crawl.js')

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
