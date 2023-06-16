const API_KEY = 'live_4SvD6A1xT7ikQn4pDzx2DdEt0yYKvUvfK1jjb7HWTeaWbRpNOKC7QhdcTqXwkkAp';

function fetchBreeds() {
    const BASS_URL = 'https://api.thecatapi.com/v1/breeds';
    
  
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
    const URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  
    const options = {
      headers: {
        'x-api-key': API_KEY,
      },
    };
  
    return fetch(URL, options)
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


const breedSelectElement = document.querySelector('.breed-select');
const catInfoElement = document.querySelector('.cat-info');
const loaderElement = document.querySelector('.loader');
const breedNameElement = document.querySelector('.breed-name');
const descriptionElement = document.querySelector('.description');
const temperamentElement = document.querySelector('.temperament');
const imageElement = catInfoElement.querySelector('img');

loaderElement.style.display = 'block';
breedSelectElement.disabled = true;

fetchBreeds()
  .then((breeds) => {
    loaderElement.style.display = 'none';
    breedSelectElement.disabled = false;

    breeds.forEach((breed) => {
      const optionElement = document.createElement('option');
      optionElement.value = breed.id;
      optionElement.textContent = breed.name;
      breedSelectElement.appendChild(optionElement);
    });
  });

breedSelectElement.addEventListener('change', () => {
  loaderElement.style.display = 'block';
  catInfoElement.style.display = 'none';

  const breedId = breedSelectElement.value;

  fetchCatByBreed(breedId)
    .then((cat) => {
      loaderElement.style.display = 'none';
      catInfoElement.style.display = 'block';

      breedNameElement.textContent = cat.breeds[0].name;
      descriptionElement.textContent = cat.breeds[0].description;
      temperamentElement.textContent = cat.breeds[0].temperament;
      imageElement.src = cat.url;
      imageElement.alt = cat.breeds[0].name;
    });
});