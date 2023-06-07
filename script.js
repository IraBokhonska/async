/*const BASE_URL = "http://www.omdbapi.com/?apikey=c30fe8d5&s=min&type=movie";
const getProductsByAxios = async () => {
  const resp = await axios.get(`${BASE_URL}`);

  console.log(resp);
};

getProductsByAxios(); */ //виведено масив об'єктів продуктів API

const filmKey = "c30fe8d5";
const userSearchInput = document.querySelector(".search");
const userSearchType = document.querySelectorAll(".type");

const BASE_URL = `http://www.omdbapi.com/?apikey=${filmKey}`;

const listElement = document.querySelector(".film__list");

const addFilms = (item) => {
  const newListElement = document.createElement("li");

  newListElement.innerHTML = `
    <h2 class="h2">${item.Title}</h2>
    <p>${item.Year}</p>
    <span>${item.imdbID}</span>
    <span>${item.Type}</span>
    <img src="${item.Poster}" alt=""/>
  `;

  listElement.appendChild(newListElement);
};

const getFilmsByAxios = async () => {
  const filmSearch = userSearchInput.value;

  let filmType = "";

  userSearchType.forEach((radio) => {
    if (radio.checked) {
      filmType = radio.value;
    }
  });

  const url = `${BASE_URL}&s=${filmSearch}&type=${filmType}`;

  const resp = await axios.get(url);

  listElement.innerHTML = "";

  resp.data.Search.forEach(addFilms);
};

const form = document.querySelector(".form__container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getFilmsByAxios();
});
