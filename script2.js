const container = document.querySelector(".content__column");
let idArray = Array.from({ length: 671 }, (value, number) => number + 1);
let id = 0;
const cardLimit = 10;
let arrayOfCharacters;

loadCharacters();

async function loadCharacters() {
  try {
    let response = await fetch(`https://rickandmortyapi.com/api/character/${idArray}`);
    let data = await response.json();
    arrayOfCharacters = data;
    getArticle(arrayOfCharacters);
  } catch (err) {
    console.error(err.message);
  }
}

function getArticle(arrayOfCharacters) {
  for (let i = 0; i < cardLimit; i++) {
    id++;
    console.log(arrayOfCharacters);
    addAtricletoDOM(id, arrayOfCharacters)
  }
}

function addAtricletoDOM(id, array) {
  let postArticle = document.createElement('article');
  postArticle.classList.add('content__item');
  postArticle.innerHTML =
    `<div class="item__image">
   <img src=${array[id].image} alt="${array[id].name}">
  </div>
  <div class="item__info">
    <h2>${array[id].name}</h2>
    <h3>Status: ${array[id].status}<h3>
  <div>
    <p> Last known location: <b>${array[id].location.name}</b></p>
  </div>`;
  container.appendChild(postArticle);
}

window.addEventListener('scroll', function () {
  const rootElement = document.documentElement;
  const { scrollTop, scrollHeight, clientHeight } = rootElement;
  if (scrollTop + clientHeight >= scrollHeight - 1) {
    getArticle(arrayOfCharacters);
  }
})