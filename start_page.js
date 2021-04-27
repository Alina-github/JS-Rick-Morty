const currentLocation = location.origin + '/feed';

const showLinkToFeedPage = (callback) => {
    window.removeEventListener('scroll', uploadMoreIdAfterScroll);
    let content = addLinktoDOM(currentLocation);
    return callback(content)
};

function addLinktoDOM(link) {
    let card = document.createElement('article');
    card.innerHTML =
        `<h1> Go to the <a class="feed link" href="#">HOME</a> page</h1>`
    return card;
}

