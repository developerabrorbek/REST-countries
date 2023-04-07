"use strict";

function renderFilter(arr) {
  const filteredArr = [];
  arr.forEach((item, index) => {
    if (!filteredArr.includes(item.region)) {
      filteredArr.push(item.region);
    }
  });

  filteredArr.forEach((item, index) => {
    const option = document.createElement("option");
    option.innerText = item;
    elFilter.append(option);
  });
}

function renderCards(arr) {
  elCards.innerHTML = "";

  arr.forEach((item, index) => {
    const html = `
        <li class="hero-card">
            <img src="${item.flags.png}" alt="${item.flags.alt}" class="card-image" dataset-id="${item.idd.suffixes}">
            <div class="hero-card__body"  dataset-id="${item.idd.suffixes}">
                <h3 class="card-title">
                    ${item.name.official}
                </h3>
                <div class="card-extras">
                    <p class="card-population"><strong>Population: </strong> ${item.population}</p>
                    <p class="region"><strong>Region: </strong> ${item.region}</p>
                    <p class="capital"><strong>Capital: </strong>${item.capital[0]}</p>
                </div>
            </div>
        </li>`;

    elCards.insertAdjacentHTML("afterbegin", html);
  });
}

function searchCards(arr, inputValue) {
  if (inputValue) {
    let filteredArr = arr.filter((item) =>
      item.name.official.toLowerCase().includes(inputValue)
    );
    renderCards(filteredArr);
  } else {
    renderCards(arr);
  }
}

function filterByRegion(arr, value) {
  if (value === "1") renderCards(arr);
  else {
    const filteredArr = arr.filter((item) => item.region == value);
    renderCards(filteredArr);
  }
}

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
