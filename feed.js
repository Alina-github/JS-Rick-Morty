const container = document.querySelector(".content__column");
const loader = document.querySelector(".loading");

let charactersIds = [];
let currentCharacterId = 1;
const cardsLimit = 10;

const getRangeofCharacters = (id) => {
    for (let i = 0; i < cardsLimit; i++) {
        charactersIds.push(id);
        id++;
    }
    return charactersIds;
}

const showArticles = callback => {
    buildArticles()
        .then(content => callback(content))
        .then(() => window.addEventListener('scroll', uploadMoreIdAfterScroll))
}

async function buildArticles() {
    const characters =
        await fetchData.loadCharacterData(currentCharacterId, `https://rickandmortyapi.com/api/character/${getRangeofCharacters(currentCharacterId)}`)
    const articles = document.createElement('article');
    characters.forEach(element => {
        const article = addAtricleToDOM(element);
        articles.append(article);
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
    postArticle.setAttribute('onclick', `router.loadRoute(['feed', 'card', ${character.id}], true)`);

    return postArticle;
}

function showLoading() {
    loader.classList.add('show');
}

function hideLoading() {
    loader.classList.remove('show');
}

const uploadMoreIdAfterScroll = function (callback) {
    const rootElement = document.documentElement;
    const {scrollTop, scrollHeight, clientHeight} = rootElement;
    if (scrollTop + clientHeight >= scrollHeight - 1) {
        currentCharacterId += cardsLimit;
        showLoading();
        setTimeout(() => {
            // showArticles();
            router.loadRoute('feed', true)
            hideLoading();
        }, 1000);
    }
}

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
}

