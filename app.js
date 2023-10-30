chrome.tabs.query({ currentWindow: true, highlighted: true }, async (tab) => {
    const { url, title, index } = tab[0]

    const site = 'https://pawoo.net'
    const nl = '\n\n'

    const TWITTER_STATUS_REGEX =
        /^https:\/\/(mobile\.)?twitter.com\/(.+?)\/status\/(\d+)/

    let intent = `${site}/share?text=${encodeURIComponent(
        nl + title + nl + url,
    )}`

    // if post is a tweet, use PAWOO_RT_API
    if (url.match(TWITTER_STATUS_REGEX) !== null) {
        const rt = await pawoo_rt(url)

        intent = `${site}/share?text=${encodeURIComponent(
            nl + 'RT:' + nl + rt + nl + url,
        )}`
    }

    chrome.tabs.create({ url: intent, index: index + 1 })
})

const pawoo_rt = async (url) => {
    const PAWOO_RT_API = ''
    const PAWOO_RT_TOKEN = ''

    const response = await fetch(PAWOO_RT_API, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: PAWOO_RT_TOKEN,
            status: url,
        }),
    })

    const data = await response.json()
    return data.status
}
