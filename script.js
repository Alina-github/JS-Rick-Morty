const container = document.querySelector(".content__column");

async function getArticle() {

  try {
    let response = await fetch(`https://rickandmortyapi.com/api/character/${getRandomNr()}`);
    let data = await response.json();
    addAtricletoDOM(data);
  } catch (err) {
    console.log(err.message);
  }
}
function addAtricletoDOM(data) {
  let postArticle = document.createElement('article');
  postArticle.classList.add('content__item');
  postArticle.innerHTML =
    `<div class="item__image">
   <img src=${data.image} alt="${data.name}">
  </div>
  <div class="item__info">
    <h2>${data.name}</h2>
    <h3>Status: ${data.status}<h3>
  <div>
    <p> Last known location: <b>${data.location.name}</b></p>
  </div>`;
  container.appendChild(postArticle);
}

function getRandomNr() {
  return Math.floor(Math.random() * 671) + 1;
}

function loadArticles() {
  for (let i = 0; i < 10; i++) {
    getArticle();
  }
}

loadArticles();

window.addEventListener('scroll', function () {
  const rootElement = document.documentElement;
  const { scrollTop, scrollHeight, clientHeight } = rootElement;
  if (scrollTop + clientHeight >= scrollHeight - 1) {
    loadArticles();
  }
})
