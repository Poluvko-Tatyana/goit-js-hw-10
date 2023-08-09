
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import './css/cat-api.css';
import Notiflix from 'notiflix';

// import SlimSelect from 'slim-select'

const API_KEY = 'live_4SvD6A1xT7ikQn4pDzx2DdEt0yYKvUvfK1jjb7HWTeaWbRpNOKC7QhdcTqXwkkAp';

const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

loaderEl.style.display = 'none';
catInfoEl.style.display = 'none';
errorEl.style.display = 'none';
breedSelectEl.disabled = true;

// new SlimSelect({
//   select: '.breed-select'
// })

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
})
.catch((error) => {
  Notiflix.Notify.failure('Error fetching breeds:', error);})
  // .finally { loaderEl.style.display = 'none';};


breedSelectEl.addEventListener('change', (event) => {

  let breedId = event.target.value;

  fetchCatByBreed(breedId)
  .then(createMarkup)
  // ((data) => 
  // catInfoEl.innerHTML = createMarkup(data[0]))
  .catch((error) => {
    errorEl.style.display = 'block';
    Notiflix.Notify.failure('Error fetching cat:', error)});
   
    function createMarkup(data){
      const markup = el => {
        return ` 
     <img class="cat-img" src="${el.url}" alt="${el.breeds[0].name}" >
     <div class="cat-text">
     <h1 class="cat-header">${el.breeds[0].name}</h1>
     <p>${el.breeds[0].description}</p>
     <p><span><b>Temperament: </b></span>${el.breeds[0].temperament}</p>
     </div>`;
      };
    
      catInfoEl.innerHTML = markup(data[0]);
      loaderEl.style.display = 'none';
      catInfoEl.style.display = 'block';
    }

    // j