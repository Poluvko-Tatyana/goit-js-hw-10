const API_KEY = 'live_4SvD6A1xT7ikQn4pDzx2DdEt0yYKvUvfK1jjb7HWTeaWbRpNOKC7QhdcTqXwkkAp';
const breedSelectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const breedNameEl = document.querySelector('.breed-name');
const descriptionEl = document.querySelector('.description');
const temperamentEl = document.querySelector('.temperament');
const imageEl = catInfoEl.querySelector('img');


function fetchBreeds() {
    const BASS_URL = `https://api.thecatapi.com/v1/breeds?api_key=${API_KEY}`;
    
    return fetch(BASS_URL)
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
  
        return resp.json();
      })
      .then((data) =>
        data.map((breed) => ({
          id: breed.id,
          name: breed.name,
        }))
      )
      .catch((error) => {
        console.error('Error fetching breeds:', error);
      });
  }
  
  function fetchCatByBreed(breedId) {
    const URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}&api_key=${API_KEY}`;
  
    return fetch(URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
  
        return response.json();
      })
      .then((data) => data[0])
      
      .catch((error) => {
        console.error('Error fetching cat:', error);
      });
  }

// loaderEl.style.display = 'block';
// breedSelectEl.disabled = true;

fetchBreeds()
  .then((breeds) => {
    // loaderEl.style.display = 'none';
    // breedSelectEl.disabled = false;

    breeds.forEach((breed) => {
      const optionEl = document.createElement('option');
      optionEl.value = breed.id;
      optionEl.textContent = breed.name;
      breedSelectEl.appendChild(optionEl);
    });
  });

breedSelectEl.addEventListener('change', () => {
  // loaderEl.style.display = 'block';
  // catInfoEl.style.display = 'none';

  const breedId = breedSelectEl.value;

  fetchCatByBreed(breedId)
    .then((cat) => {
      
      // loaderEl.style.display = 'none';
      // catInfoEl.style.display = 'block';

      breedNameEl.textContent = cat.breeds[0].name;
      
      descriptionEl.textContent = cat.breeds[0].description;
      temperamentEl.textContent = cat.breeds[0].temperament;
      imageEl.src = cat.url;
      imageEl.alt = cat.breeds[0].name;
    });
});