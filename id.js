  let characterDetails;
 
   async function loadCharacterData(id) {
   try {
     let response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
     let data = await response.json();
     return Promise.resolve(data);

   } catch (err) {
     console.error(Promise.rejected(data));
   }
 }
 
 let showCard = (id) => loadCharacterData(id).then(data => addACharactertoDOM(data));

 function addACharactertoDOM(data) {
 document.getElementById('app').innerHTML = 

     `   <h1>Character Details</h1>
<!--   <div class="character"> -->
         <div class="item__image"> 
         <img src=${data.image} alt="${data.name}">
         </div>
<!--        <div class="character__info">-->
         <h2>${data.name}</h2>
         <p><b>Status:</b> ${data.status}</p>
         <p><b>Species:</b> ${data.species}</p>
         <p><b>Gender:</b> ${data.gender}</p>
         <h3 style="display:inline;">Location:${data.location.name}</h3>
         <h4><b>Number of episodes:</b> ${data.episode.length + 1}</h4>
<!--         </div>-->
<!--         </div>-->
<div class="button-block">
        <a href="#" class="character__btn">Episodes</a></button>
 </div>`

 }

 