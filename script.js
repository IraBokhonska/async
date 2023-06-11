/*const BASE_URL = "http://www.omdbapi.com/?apikey=c30fe8d5&s=min&type=movie";
const getProductsByAxios = async () => {
  const resp = await axios.get(`${BASE_URL}`);

  console.log(resp);
};

getProductsByAxios(); */ //виведено масив об'єктів продуктів API

const filmKey = "c30fe8d5";
const userSearchInput = document.querySelector(".search");
const userSearchType = document.querySelectorAll(".type");

userSearchInput.addEventListener("click", function () {
  this.value = "";
});

const BASE_URL = `http://www.omdbapi.com/?apikey=${filmKey}`;

const listElement = document.querySelector(".film__list");
const paginationElement = document.querySelector(".film__pagination");

const addFilms = (item) => {
  const newListElement = document.createElement("li");
  newListElement.className = "film__item";

  newListElement.innerHTML = `
  <h2 class="film__name">${item.Title}</h2>
  <p class="film__year">${item.Year}</p>
  <img class="film__poster" src="${item.Poster}" alt="poster"/>
  `;

  listElement.appendChild(newListElement);
};

const getFilmsByAxios = async (page = 1) => {
  const filmSearch = userSearchInput.value;

  let filmType = "";

  userSearchType.forEach((radio) => {
    if (radio.checked) {
      filmType = radio.value;
    }
  });

  const url = `${BASE_URL}&s=${filmSearch}&type=${filmType}&page=${page}`;

  const resp = await axios.get(url);

  listElement.innerHTML = "";
  paginationElement.innerHTML = ""; // Очищаємо пагінацію перед додаванням нових елементів

  if (resp.data.Search && resp.data.Search.length > 0) {
    resp.data.Search.forEach(addFilms);
  } else {
    const errorMessage = document.createElement("p");
    errorMessage.className = "film__error";
    errorMessage.textContent = "No films found.";

    listElement.appendChild(errorMessage);
  }

  // Додавання пагінації
  if (resp.data.totalResults > 10) {
    const totalPages = Math.ceil(resp.data.totalResults / 10);
    addPagination(totalPages, page);
  }
};

const addPagination = (totalPages, currentPage) => {
  const maxPages = 10; // макс. пагінація на сторінці

  let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
  let endPage = startPage + maxPages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    const paginationListItem = document.createElement("li");
    paginationListItem.className = "pagination__item";

    const pageLink = document.createElement("a");
    pageLink.href = "#";
    pageLink.textContent = i;
    pageLink.className = currentPage === i ? "active" : "";

    pageLink.addEventListener("click", (e) => {
      e.preventDefault();
      getFilmsByAxios(i);
    });

    paginationListItem.appendChild(pageLink);
    paginationElement.appendChild(paginationListItem);
  }
};

const form = document.querySelector(".form__container");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getFilmsByAxios();
});
