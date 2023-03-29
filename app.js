"use strict";

const elCards = document.querySelector(".hero-cards");
const elFilter = document.querySelector(".hero-form__filter");
const inputSearch = document.querySelector(".hero-search__input");
const elBackModal = document.querySelector(".modal-button__back");
const elModal = document.querySelector(".modal");
const elHero = document.querySelector(".hero");

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    renderFilter(data);
    renderCards(data);
  });

inputSearch.addEventListener("input", (evt) => {
  let value = evt.target.value;

  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      searchCards(data, value.toLowerCase());
    });
});

elFilter.addEventListener("change", (evt) => {
  const value = evt.target.value;

  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => filterByRegion(data, value));
});

elCards.addEventListener("click", (evt) => {
  if (
    evt.target.classList.contains("card-image") ||
    evt.target.classList.contains("hero-card__body")
  ) {
    const elId = evt.target.getAttribute("dataset-id");

    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        renderElModal(data, elId);
      });
  }
});

function renderElModal(arr, id) {
  let filteredArr = arr.filter((item) => item.idd.suffixes == id);

  if (filteredArr.length) {
    elModal.innerHTML = "";

    let item = filteredArr[0];
    const html = `
        <div class="container">
                <div class="modal__inner">
                    <button class="modal-button__back"><img src="./images/back-icon.svg" alt="back">Back</button>
                    <div class="modal-main">
                        <img src="${item.flags.png}" alt="image" class="modal-image">
                        <div class="modal-body">
                            <h1 class="modal-body__title">${item.name.official}</h1>

                            <div class="modal-body__main">
                                <ul class="first-list">
                                    <li class="list-item">
                                        <p class="list-item__text"><strong>Native Name: </strong>${item.name.common}</p>
                                    </li>
                                    <li class="list-item">
                                        <p class="list-item__text"><strong> Population: </strong>${item.population} people</p>
                                    </li>
                                    <li class="list-item">
                                        <p class="list-item__text"><strong>Region: </strong>${item.region}</p>
                                    </li>
                                    <li class="list-item">
                                        <p class="list-item__text"><strong>Sub Region: </strong>${item.subregion}</p>
                                    </li>
                                    <li class="list-item">
                                        <p class="list-item__text"><strong>Capital: </strong>Brussels${item.capital[0]}</p>
                                    </li>
                                </ul>

                                <ul class="first-list">
                                    <li class="list-item">
                                        <p class="list-item__text"><strong>Top Level Domain: </strong>${item.tld[0]}</p>
                                    </li>
                                    <li class="list-item">
                                        <p class="list-item__text"><strong>Currencies: </strong>${item.currencies[0]?.name}</p>
                                    </li>
                                    <li class="list-item">
                                        <p class="list-item__text"><strong>Languages: </strong>${item.languages}</p>
                                    </li>
                                </ul>
                            </div>

                            <div class="modal-extra">
                                <h3>Border Countries:</h3>
                                <ul class="modal-extra__list">
                                    <li class="modal-extra__list-item">
                                        <button class="modal-extra__btn"></button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

    elModal.insertAdjacentHTML("afterbegin", html);
  }
  elHero.classList.add("hide-modal");
  elModal.classList.remove("hide-modal");
}


if(!elModal.classList.includes("hide-modal")){
    elBackModal.addEventListener("click", (evt) => {
        elHero.classList.remove("hide-modal");
        elModal.classList.add("hide-modal");
      });
}

