const container = document.querySelector(".content__column");
let idArray = [];
let id = 0;
let cardsLimit = 10;

const getRangeofCharacters = (id) => {
  for (let i = id; i <= id + 10; i++) {
    idArray.push(i);
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

let getArticles = () => loadCharacters(id).then(data => {
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

getArticles();

window.addEventListener('scroll', function () {
  const rootElement = document.documentElement;
  const { scrollTop, scrollHeight, clientHeight } = rootElement;
  if (scrollTop + clientHeight >= scrollHeight - 1) {
    id += cardsLimit;
    getRangeofCharacters(id);
    loadCharacters(id).then(data => {
      data.slice(id, id + 10).forEach(character => addAtricletoDOM(character));
    })
  }
})


