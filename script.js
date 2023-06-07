/*const BASE_URL = "http://www.omdbapi.com/?apikey=c30fe8d5&s=min&type=movie";
const getProductsByAxios = async () => {
  const resp = await axios.get(`${BASE_URL}`);

  console.log(resp);
};

getProductsByAxios(); */ //виведено масив об'єктів продуктів API

const BASE_URL = "http://www.omdbapi.com/?apikey=c30fe8d5&s=min&type=movie";

const listElement = document.querySelector(".film__list");

const addFilms = (item) => {
  const newListElement = document.createElement("li");

  // newListElement.classList = "film__item"; //можна додати клас і офомити його в css

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
  const resp = await axios.get(`${BASE_URL}`);

  resp.data.Search.forEach(addFilms);
};

getFilmsByAxios();
