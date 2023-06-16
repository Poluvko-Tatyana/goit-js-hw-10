import './js/cat-api'

const div = document.querySelector('.cat-info');

const imgInfo = `<img src="" alt="" />
<h2 class="breed-name"></h2>
<p class="description"></p>
<p class="temperament"></p>`;

div.insertAdjacentHTML("afterbegin", imgInfo);