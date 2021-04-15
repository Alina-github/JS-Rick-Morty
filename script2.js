const container = document.querySelector(".content__column");
let idArray = Array.from({ length: 671 }, (value, number) => number + 1);
let id = 0;
let arrayOfCharacters = [];

getArticle();

async function getArticle() {
  try {
    let response = await fetch(`https://rickandmortyapi.com/api/character/${idArray}`);
    arrayOfCharacters = await response.json();
    loadArticles(arrayOfCharacters);
  } catch (err) {
    console.log(err.message);
  }
}

function loadArticles(arrayOfCharacters) {
  for (let i = 0; i < 10; i++) {
    id++;
    addAtricletoDOM(id, arrayOfCharacters);
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
    loadArticles(arrayOfCharacters);
  }
})