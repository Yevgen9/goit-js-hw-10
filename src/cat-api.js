const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_2Ho3xjSdPQtSkxWtmErDvQyc0WUPB0kqOnDeHwNM5odZyrTLx0mIyezJlu9nIhnC';

// export function fetchBreeds() {
//   return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// export function fetchCatByBreed(breedId) {
//   return fetch(
//     `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

export async function fetchBreeds() {
  try {
    const response = await fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await fetch(
      `${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`
    );
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  } catch (error) {
    throw new Error(error);
  }
}
