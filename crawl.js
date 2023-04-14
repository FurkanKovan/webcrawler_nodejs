const { JSDOM } = require('jsdom')

function standardizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

function getURLsFromHTML(htmlBody, baseURL){
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const link of linkElements) {
        if (link.href.slice(0,1) === '/') {
            // relative url
            try {
                const urlObj = new URL(`${baseURL}${link.href}`)
                urls.push(urlObj.href)
            } catch(err) {
                console.log(`Error with the relative url: ${err.message}`)
            }
        } else {
            // absolute url
            try {
                const urlObj = new URL(link.href)
                urls.push(urlObj.href)
            } catch(err) {
                console.log(`Error with the absolute url: ${err.message}`)
            }
        }
    }
    return urls
}

async function crawlPage(currentURL) {
    console.log(`Currently crawling: ${currentURL}`)

    try {
        const resp = await fetch(currentURL)
        if (resp.status > 399) {
            console.log(`Error in fetch with status code: ${resp.status}, on page ${currentURL}`)
            return
        }
        const contentType = resp.headers.get('content-type')
        if (!contentType.includes("text/html")) {
            console.log(`Non html response! Content type: ${contentType}, on page ${currentURL}`)
            return
        }
        console.log(await resp.text())

    } catch(err) {
        console.log(`Error in fetch: ${err.message}, on page ${currentURL}`)
    }
}

module.exports = {
    standardizeURL,
    getURLsFromHTML,
    crawlPage
}