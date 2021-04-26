const container = document.querySelector(".content__column");
const loader = document.querySelector(".loading");

let charactersIds = [];
let id = 1;
const cardsLimit = 10;

const getRangeofCharacters = (id) => {
    for (let i = 0; i < cardsLimit; i++) {
        charactersIds.push(id);
        id++;
    }
    return charactersIds;
}

const showArticles = callback => {
    buildArticles().then(result => callback(result))
}

async function buildArticles() {
    const characters = await fetchData.loadCharacter (id, `https://rickandmortyapi.com/api/character/${getRangeofCharacters(id)}`)
    const articles = document.createElement('articles');
    characters.forEach(element => {
        let htmlElement = addAtricleToDOM(element);
        articles.append(htmlElement);
    })
    return articles;
}

function addAtricleToDOM(character) {

    let postArticle = document.createElement('article');
    postArticle.innerHTML =
        `<div class="item__image">
  <img src=${character.image} alt="${character.name}">
  </div>
  <div class="item__info">
    <h2>${character.name}</h2>
    <h3>Status: ${character.status}<h3>
    <p> Last known location: <b>${character.location.name}</b></p>`;

    postArticle.classList.add('content__item');
    postArticle.setAttribute('id', `${character.id}`);
    postArticle.setAttribute('onclick', `router.loadRoute('feed', 'card', ${character.id})`);

    return postArticle;
}

function showLoading() {
    loader.classList.add('show');
}

function hideLoading() {
    loader.classList.remove('show');
}

    // window.scrollTop = window.scrollHeight;

const uploadMoreIdAfterScroll = function (callback) {
    const rootElement = document.documentElement;
    const {scrollTop, scrollHeight, clientHeight} = rootElement;
    if (scrollTop + clientHeight >= scrollHeight-1) {
        console.log(`Im on the bottom and current id is ${id}!`)
        id += cardsLimit;
        showLoading();
        setTimeout(() => {
            // showArticles();
            router.loadRoute('feed')
            hideLoading();
        }, 2000);
    }
}

const handleInitialPage = (callback) => {
    showArticles(callback);
}

const handleOneCard = (id, callback) => {
    showCard(id, callback);
    window.removeEventListener('scroll', uploadMoreIdAfterScroll);
}

window.addEventListener('scroll', uploadMoreIdAfterScroll);

window.onbeforeunload = function () {
    window.scrollTo(0, 0);}