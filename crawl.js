const { JSDOM } = require('jsdom')

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

function standardizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }

    return hostPath
}

module.exports = {
    standardizeURL,
    getURLsFromHTML
}