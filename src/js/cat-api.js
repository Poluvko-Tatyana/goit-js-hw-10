
const API_KEY = 'live_4SvD6A1xT7ikQn4pDzx2DdEt0yYKvUvfK1jjb7HWTeaWbRpNOKC7QhdcTqXwkkAp';

export function fetchBreeds() {
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

  
  export function fetchCatByBreed(breedId) {
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
  
  