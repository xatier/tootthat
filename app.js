chrome.tabs.query({ currentWindow : true, highlighted : true }, (tab) => {
    const {url, title} = tab[0];

    const site = 'https://pawoo.net'
    const nl = "\n"

    const intent = `${site}/share?text=${encodeURIComponent(nl+title+nl+url)}`

    chrome.tabs.create({ url : intent });
});
