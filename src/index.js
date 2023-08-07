
import { fetchBreeds, fetchCatByBreed } from "./js/cat-api";
import './css/cat-api.css';
import Notiflix from 'notiflix';

// import SlimSelect from 'slim-select'

const API_KEY = 'live_4SvD6A1xT7ikQn4pDzx2DdEt0yYKvUvfK1jjb7HWTeaWbRpNOKC7QhdcTqXwkkAp';

const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');

const breedId = breedSelectEl.value;
console.log(breedId)

loaderEl.style.display = 'block';
catInfoEl.style.display = 'none';
errorEl.style.display = 'block';
breedSelectEl.disabled = true;



// new SlimSelect({
//   select: '.breed-select'
// })


function fetchBreeds() {
    const BASS_URL = `https://api.thecatapi.com/v1/breeds`;

    const options = {
      headers: {
        'x-api-key': API_KEY,
      },
    };
    
    return fetch(BASS_URL, options)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
  
        return resp.json();
      })  
  }

  fetchBreeds().then((data) =>
  data.map((breed) => ({
    id: breed.id,
    name: breed.name,
  }))
)
.catch((error) => {
  Notiflix.Notify.failure('Error fetching breeds:', error);
});



  function fetchCatByBreed(breedId) {
    const URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

    const options = {
      headers: {
        'x-api-key': API_KEY,
      },
    };
  
    return fetch(URL, options)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
  
        return resp.json();
      })
      
  }
  
  fetchCatByBreed(breedId)
  .then((data) => 
  catInfoEl.innerHTML = createMarkup(data[0]))
  .catch((error) => {
    Notiflix.Notify.failure('Error fetching cat:', error)});
    const Loading = `<p class = Loading>Loading...</p>`;
    catInfoEl.insertAdjacentHTML("afterend", Loading);

  function createMarkup(arr){
    return arr.map(({name, description, temperament, url}) =>
    `<img src="${url}" alt="${name}" />
    <h2>${name}</h2>
    <p>${description}</p>
    <p>${temperament}</p>`); 
  }
  

fetchBreeds()
  .then((breeds) => {
    loaderEl.style.display = 'none';
    breedSelectEl.disabled = false;

    breeds.forEach((breed) => {
      const optionEl = document.createElement('option');
      optionEl.value = breed.id;
      optionEl.textContent = breed.name;
      breedSelectEl.appendChild(optionEl);
    });
  });

 

breedSelectEl.addEventListener('change', () => {
      loaderEl.style.display = 'none';
      catInfoEl.style.display = 'block';
      errorEl.style.display = 'none';
      
      })