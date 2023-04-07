"use strict";

const elCards = document.querySelector(".hero-cards");
const elFilter = document.querySelector(".hero-form__filter");
const inputSearch = document.querySelector(".hero-search__input");
const elBackModal = document.querySelector(".modal-button__back");
const elModal = document.querySelector(".modal");
const elHero = document.querySelector(".hero");
const elBorderCountries = document.querySelector(".modal-extra__list");



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
    evt.target.matches(".card-image") ||
    evt.target.matches(".hero-card__body")
  ) {
    const elId = evt.target.getAttribute("dataset-id");

    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]);
        renderElModal(data, elId);
      });
  }
});


elModal.addEventListener("click", (evt) => {
  if (evt.target.matches(".modal-button__back")) {
    elHero.classList.remove("hide-modal");
    elModal.classList.add("hide-modal");
  }
});
