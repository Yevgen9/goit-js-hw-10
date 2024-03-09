import { fetchBreeds, fetchCatByBreed } from './cat-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const ref = {
  breedSelect: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loaderRef: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const { breedSelect, divCatInfo, loaderRef, error } = ref;

loaderRef.classList.replace('loader', 'is-hidden');

error.classList.add('is-hidden');
divCatInfo.classList.add('is-hidden');

let arrBreedsId = [];

// fetchBreeds()
//   .then(data => {
//     data.forEach(element => {
//       arrBreedsId.push({ text: element.name, value: element.id });
//     });
//     new SlimSelect({
//       select: breedSelect,
//       data: arrBreedsId,
//     });
//   })
//   .catch(onFetchError);

// breedSelect.addEventListener('change', onSelectBreed);

// function onSelectBreed(event) {
//   loaderRef.classList.replace('is-hidden', 'loader');

//   breedSelect.classList.add('is-hidden');
//   divCatInfo.classList.add('is-hidden');

//   const breedId = event.currentTarget.value;
//   fetchCatByBreed(breedId)
//     .then(data => {
//       loaderRef.classList.replace('loader', 'is-hidden');

//       breedSelect.classList.remove('is-hidden');
//       const { url, breeds } = data[0];

//       divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
//       divCatInfo.classList.remove('is-hidden');
//     })
//     .catch(onFetchError);
// }

// function onFetchError(error) {
//   breedSelect.classList.remove('is-hidden');
//   loaderRef.classList.replace('loader', 'is-hidden');

//   Notify.failure(
//     'Oops! Something went wrong! Try reloading the page or select another cat breed!',
//     {
//       position: 'center-center',
//       timeout: 5000,
//       width: '400px',
//       fontSize: '24px',
//     }
//   );
// }



async function initializeBreeds() {
  try {
    const data = await fetchBreeds();
    data.forEach(element => {
      arrBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: breedSelect,
      data: arrBreedsId,
    });
  } catch (error) {
    onFetchError(error);
  }
}

initializeBreeds();

breedSelect.addEventListener('change', onSelectBreed);

async function onSelectBreed(event) {
  loaderRef.classList.replace('is-hidden', 'loader');
  breedSelect.classList.add('is-hidden');
  divCatInfo.classList.add('is-hidden');

  const breedId = event.currentTarget.value;

  try {
    const data = await fetchCatByBreed(breedId);
    loaderRef.classList.replace('loader', 'is-hidden');
    breedSelect.classList.remove('is-hidden');
    const { url, breeds } = data[0];

    divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;
    divCatInfo.classList.remove('is-hidden');
  } catch (error) {
    onFetchError(error);
  }
}

function onFetchError(error) {
  breedSelect.classList.remove('is-hidden');
  loaderRef.classList.replace('loader', 'is-hidden');

  Notify.failure(
    'Oops! Something went wrong! Try reloading the page or select another cat breed!',
    {
      position: 'center-center',
      timeout: 5000,
      width: '400px',
      fontSize: '24px',
    }
  );
}