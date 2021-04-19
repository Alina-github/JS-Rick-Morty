const container = document.querySelector(".content__column");
const loader = document.querySelector(".loading");
let idArray = [];
let id = 1;
let cardsLimit = 10;

const getRangeofCharacters = (id) => {
  for (let i = 0; i < cardsLimit; i++) {
    idArray.push(id);
    id++;
  }
  return idArray;
}

async function loadCharacters(id) {
  try {
    let response = await fetch(`https://rickandmortyapi.com/api/character/${getRangeofCharacters(id)}`);
    let data = await response.json();
    return Promise.resolve(data);
  } catch (err) {
    console.error(Promise.rejected(data));
  }
}

const showArticles = () => loadCharacters(id).then(data => {
  data.forEach(character => addAtricletoDOM(character));
});

function addAtricletoDOM(character) {
  let postArticle = document.createElement('article');
  postArticle.classList.add('content__item');
  postArticle.innerHTML =
    `<div class="item__image">
   <img src=${character.image} alt="${character.name}">
  </div>
  <div class="item__info">
    <h2>${character.name}</h2>
    <h3>Status: ${character.status}<h3>
  <div>
    <p> Last known location: <b>${character.location.name}</b></p>
  </div>`;
  container.appendChild(postArticle);
}

function showLoading() {
  loader.classList.add('show');
}

function hideLoading() {
  loader.classList.remove('show');
}

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

window.addEventListener('scroll', function () {
  const rootElement = document.documentElement;
  const { scrollTop, scrollHeight, clientHeight } = rootElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    idArray = [];
    id += cardsLimit;
    showLoading();
    setTimeout(() => {
      showArticles();
      hideLoading();
    }, 2000);
  }
})

showArticles();