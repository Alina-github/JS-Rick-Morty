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
    return await response.json();
  } catch (err) {
    console.error(err);
  }
}

const showArticles = () => loadCharacters(id)
.then(data => {
  data.forEach(character => addAtricletoDOM(character));
})
.then(()=> addListenersToArticles());

function addAtricletoDOM(character) {

  let postArticle = document.createElement('article');
  postArticle.innerHTML =
    `<div class="item__image">
   <img src=${character.image} alt="${character.name}">
  </div>
  <div class="item__info">
    <h2>${character.name}</h2>
    <h3>Status: ${character.status}<h3>
    <p> Last known location: <b>${character.location.name}</b></p>`;
  container.appendChild(postArticle);
  postArticle.classList.add('content__item');
  postArticle.setAttribute('id', `${character.id}`);

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

const uploadMoreIdAfterScroll = function () {
  const rootElement = document.documentElement;
  const {scrollTop, scrollHeight, clientHeight} = rootElement;
  if (scrollTop + clientHeight >= scrollHeight) {
    idArray = [];
    id += cardsLimit;
    showLoading();
    setTimeout(() => {
      showArticles();
      hideLoading();
    }, 1000);
  }
}

  const deleteEventListener = () => {
    window.removeEventListener('scroll', uploadMoreIdAfterScroll)
  }

const funcForInitialPage = () => {

  showArticles()
  window.addEventListener('scroll', uploadMoreIdAfterScroll)
  // at the moment of recalling root.innerHTML getArticles doesn't have time to append 10 articles;
}

const funcForOneCard = (id) => {
    showCard(id)
    deleteEventListener()
  }

// funcForInitialPage ();

function addListenersToArticles() {
document.querySelectorAll('article').forEach(article => article.addEventListener('click', goToCard))}

function goToCard(event){
  let id = event.currentTarget.id;
  router.loadRoute('card',`${id}`)}

