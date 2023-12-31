
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import './css/cat-api.css';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';


const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

loaderEl.style.display = 'none';
catInfoEl.style.display = 'none';
errorEl.style.display = 'none';
breedSelectEl.disabled = true;


  fetchBreeds()
  .then((data) =>
  data.map((breed) => ({
    id: breed.id,
    name: breed.name,
  }))
)
.then((breeds) => {
  
  breedSelectEl.disabled = false;

  breeds.forEach((breed) => {
    const optionEl = document.createElement('option');
    optionEl.value = breed.id;
    optionEl.textContent = breed.name;
    breedSelectEl.appendChild(optionEl);
  });
  new SlimSelect({
    select: breedSelectEl,
  })
  
})
.catch((error) => {
  Notiflix.Notify.failure('Error fetching breeds:', error);
  
})
// .finally(() => loaderEl.style.display = 'none')


breedSelectEl.addEventListener('change', (event) => {

  if(catInfoEl.style.display = 'none'){
    loaderEl.style.display = 'block';
  }
  let breedId = event.target.value;

  fetchCatByBreed(breedId)
  .then(createMarkup)
  .catch((error) => {
    errorEl.style.display = 'block';
    loaderEl.style.display = 'none';
    Notiflix.Notify.failure('Error fetching cat:', error)});
  });
  
   
    function createMarkup(data){
      const markup = breed => {
        return `<img class="cat-img" src="${breed.url}" alt="${breed.breeds[0].name}" >
     <div class="cat-text">
     <h1 class="cat-header">${breed.breeds[0].name}</h1>
     <p>${breed.breeds[0].description}</p>
     <p><span><b>Temperament: </b></span>${breed.breeds[0].temperament}</p>
     </div>`;
      };
    
      catInfoEl.innerHTML = markup(data[0]);
      loaderEl.style.display = 'none';
      catInfoEl.style.display = 'block';
      
  };

  function hideCatInfo() {
    if(catInfoEl.style.display = 'none'){
      loaderEl.style.display = 'block';
    }
  }
  
 
