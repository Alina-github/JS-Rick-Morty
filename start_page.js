function showStarterPageLocation() {
    return location.origin + '/feed'
}

const showLinkToFeedPage = (callback) => {
    window.removeEventListener('scroll', uploadMoreIdAfterScroll);
    let htmlElement = addLinktoDOM(showStarterPageLocation())
    return callback(htmlElement)
};

function addLinktoDOM(link) {
    let card = document.createElement('article');
    card.innerHTML =
        `<h1> Go to the <a href="/feed" class="feed">HOME</a> page</h1>`
    return card;
}
