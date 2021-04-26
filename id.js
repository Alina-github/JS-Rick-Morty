class FetchClass {

  constructor(url) {
    this.url = url;
  }

  loadCharacter (id, url) {
    return fetch(url).then(response => {
      return response.json()
    })
  }
}

const fetchData = new FetchClass();

let showCard = (id, callback) => {

  fetchData.loadCharacter(id, `https://rickandmortyapi.com/api/character/${id}`)
      .then(data => {
          let htmlElement = addACharactertoDOM(data)
    callback(htmlElement)
  });
};

function addACharactertoDOM(data) {
  let card = document.createElement('card');
  card.innerHTML =
    `<h1>Character Details</h1>
          <div class="character"> 
        <div class="character__image item__image"> 
        <img src=${data.image} alt="${data.name}">
        </div>
     <div class="character__info">
        <h2>${data.name}</h2>
        <p class="details"><b>Status:</b> ${data.status}</p>
        <p class="details"><b>Species:</b> ${data.species}</p>
        <p class="details"><b>Gender:</b> ${data.gender}</p>
        <p class="location"><b>Location:</b> ${data.location.name}</p>
        <h4><b>Number of episodes:</b> ${data.episode.length + 1}</h4>
        </div>
     </div>
<div class="button-block">
       <a href="#" class="character__btn">Episodes</a></button>
</div>`
  return card;
}
