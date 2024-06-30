document.addEventListener('DOMContentLoaded', function () {
      const LOADING_TEXT = gettext("Chargement des résultats...");
      const NO_RESULTS_TEXT = gettext("Aucun artisan trouvé. Veuillez ajuster vos filtres.");
      const ERROR_TEXT = gettext("Une erreur est survenue lors de la recherche. Veuillez réessayer.");
      const TOP_RATED_TEXT = gettext("Top Rated");
      const CONTACT_BUTTON_TEXT = gettext("Contacter");
      const PREV_BUTTON_TEXT = gettext("Précédent");
      const NEXT_BUTTON_TEXT = gettext("Suivant");
      const TIMES_TEXT = gettext("heure");
      const TARIF = gettext("Tarif");

      const applyFiltersButton = document.getElementById('applyFilters');
      const artisansContainer = document.getElementById('artisansContainer');
      const modal = document.getElementById('authModal');
      const closeModal = document.querySelector('.close');
      const experienceRange = document.getElementById('experienceRange');
      const experienceValue = document.getElementById('experienceValue');
      const ratingRange = document.getElementById('ratingRange');
      const ratingValue = document.getElementById('ratingValue');

      closeModal.onclick = function () {
            modal.style.display = 'none';
      };

      experienceRange.addEventListener('input', function () {
            experienceValue.textContent = this.value + (this.value == 20 ? '+ ans' : ' ans');
      });

      ratingRange.addEventListener('input', function () {
            ratingValue.textContent = this.value;
      });

      let currentPage = 1;

      const itemsPerPage = 9;

      function updateURL(params) {
            const url = new URL(window.location);
            Object.keys(params).forEach(key => {
                  if (params[key]) {
                        url.searchParams.set(key, params[key]);
                  } else {
                        url.searchParams.delete(key);
                  }
            });
            window.history.pushState({}, '', url);
      }

      function getURLParams() {
            const urlParams = new URLSearchParams(window.location.search);
            return {
                  category: urlParams.get('category') || '',
                  specialty: urlParams.get('specialty') || '',
                  city: urlParams.get('city') || '',
                  neighborhood: urlParams.get('neighborhood') || '',
                  experienceMin: urlParams.get('experienceMin') || '0',
                  ratingMin: urlParams.get('ratingMin') || '1',
                  availableImmediately: urlParams.get('availableImmediately') === 'true',
                  availableWeekend: urlParams.get('availableWeekend') === 'true',
                  availableEvening: urlParams.get('availableEvening') === 'true',
                  languageFrench: urlParams.get('languageFrench') === 'true',
                  languageEnglish: urlParams.get('languageEnglish') === 'true',
                  languageLocal: urlParams.get('languageLocal') === 'true',
                  sortBy: urlParams.get('sortBy') || 'relevance',
                  search: urlParams.get('search') || '',
                  page: parseInt(urlParams.get('page')) || 1,
            };
      }

      function applyURLParamsToForm(params) {
            document.querySelector('select[name="category"]').value = params.category;
            document.querySelector('input[name="specialty"]').value = params.specialty;
            document.querySelector('select[name="city"]').value = params.city;
            document.querySelector('input[name="neighborhood"]').value = params.neighborhood;
            document.getElementById('experienceRange').value = params.experienceMin;
            document.getElementById('ratingRange').value = params.ratingMin;
            document.querySelector('input[name="availableImmediately"]').checked = params.availableImmediately;
            document.querySelector('input[name="availableWeekend"]').checked = params.availableWeekend;
            document.querySelector('input[name="availableEvening"]').checked = params.availableEvening;
            document.querySelector('input[name="languageFrench"]').checked = params.languageFrench;
            document.querySelector('input[name="languageEnglish"]').checked = params.languageEnglish;
            document.querySelector('input[name="languageLocal"]').checked = params.languageLocal;
            document.getElementById('sortBy').value = params.sortBy;
            document.getElementById('searchArtisan').value = params.search;

            experienceValue.textContent = params.experienceMin + (params.experienceMin == 20 ? '+ ans' : ' ans');
            ratingValue.textContent = params.ratingMin;
      }

      function loadArtisans(page) {
            artisansContainer.innerHTML = `<p class="text-center">${LOADING_TEXT}</p>`;

            const filters = {
                  category: document.querySelector('select[name="category"]').value,
                  specialty: document.querySelector('input[name="specialty"]').value,
                  city: document.querySelector('select[name="city"]').value,
                  neighborhood: document.querySelector('input[name="neighborhood"]').value,
                  experienceMin: document.getElementById('experienceRange').value,
                  ratingMin: document.getElementById('ratingRange').value,
                  availableImmediately: document.querySelector('input[name="availableImmediately"]').checked,
                  availableWeekend: document.querySelector('input[name="availableWeekend"]').checked,
                  availableEvening: document.querySelector('input[name="availableEvening"]').checked,
                  languageFrench: document.querySelector('input[name="languageFrench"]').checked,
                  languageEnglish: document.querySelector('input[name="languageEnglish"]').checked,
                  languageLocal: document.querySelector('input[name="languageLocal"]').checked,
                  sortBy: document.getElementById('sortBy').value,
                  search: document.getElementById('searchArtisan').value,
                  page: page,
            };

            updateURL(filters);
            const apiUrl = document.getElementById('searchForm').getAttribute('action');

            const url = new URL(apiUrl, window.location.origin);

            Object.keys(filters).forEach(key => {
                  if (filters[key]) {
                        url.searchParams.append(key, filters[key]);
                  }
            });
            url.searchParams.append('itemsPerPage', itemsPerPage);

            fetch(url)
                  .then(response => {
                        if (!response.ok) {
                              throw new Error('Erreur réseau');
                        }
                        return response.json();
                  })
                  .then(data => {
                        artisansContainer.innerHTML = '';

                        if (data.length === 0) {
                              artisansContainer.innerHTML = `<p class="text-center">${NO_RESULTS_TEXT}</p>`;
                              return;
                        }

                        data.forEach(artisan => {
                              const artisanCard = createArtisanCard(artisan);
                              artisansContainer.appendChild(artisanCard);
                        });

                        updatePagination(data.totalPages, currentPage);
                  })
                  .catch(error => {
                        console.error('Erreur lors de la récupération des données:', error);
                        artisansContainer.innerHTML = `<p class="text-red-500 text-center">${ERROR_TEXT}</p>`;
                  });
      }

      const initialParams = getURLParams();
      applyURLParamsToForm(initialParams);
      currentPage = initialParams.page;
      loadArtisans(currentPage);

      applyFiltersButton.addEventListener('click', function (e) {
            e.preventDefault();
            currentPage = 1;
            loadArtisans(currentPage);
      });

      document.getElementById('sortBy').addEventListener('change', function () {
            currentPage = 1;
            loadArtisans(currentPage);
      });

      document.getElementById('searchArtisan').addEventListener('input', function () {
            currentPage = 1;
            loadArtisans(currentPage);
      });

      window.addEventListener('popstate', function () {
            const params = getURLParams();
            applyURLParamsToForm(params);
            currentPage = params.page;
            loadArtisans(currentPage);
      });

      function createArtisanCard(artisan) {
            const card = document.createElement('div');
            card.className = 'bg-white  shadow-lg overflow-hidden hover:shadow-xl transition duration-300';

            const maxDescriptionLength = 150;
            let description = artisan.description;
            if (description.length > maxDescriptionLength) {
                  description = description.substring(0, maxDescriptionLength) + '...';
            }

            card.innerHTML = `
            <div class="relative">
              <img class="h-48 w-full object-cover" src="${artisan.image_url}" alt="Photo de ${artisan.nom}">
              ${artisan.rating - 4 >= 0 ? `<div class="absolute top-0 right-0 bg-blue-600 text-white px-3 py-1 ">${TOP_RATED_TEXT}</div>` : ''}
            </div>
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h3 class="text-xl font-semibold text-gray-800">${artisan.nom}</h3>
                  <p class="text-gray-600">${artisan.specialite} - ${artisan.city}</p>
                </div>
                <div class="flex items-center bg-yellow-400 text-white px-2 py-1 ">
                  <span class="mr-1"><i class="fas fa-star"></i></span>
                  <span class="font-semibold">${artisan.rating}</span>
                </div>
              </div>
              <p class="text-gray-500 mb-4">${description}</p> <!-- Utilisation de la description limitée -->
              <div class="flex flex-wrap gap-2 mb-4">
                ${artisan.skills
                        .map(skill => `<span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 ">${skill}</span>`)
                        .join('')}
              </div>
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-500">${TARIF} : ${artisan.hourlyRate} FCFA/ ${TIMES_TEXT}</span>
                <button class="contact-btn bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 transition duration-300">${CONTACT_BUTTON_TEXT}</button>
              </div>
            </div>
          `;
            return card;
      }

      function createPaginationButton(text, page, currentPage) {
            const button = document.createElement('button');
            button.className = `relative inline-flex items-center px-4 py-2 border ${currentPage === page ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                  } text-sm font-medium hover:bg-gray-50`;
            button.textContent = text === page ? String(page) : text === 'previous' ? PREV_BUTTON_TEXT : NEXT_BUTTON_TEXT;

            if (page !== null) {
                  button.addEventListener('click', () => {
                        loadArtisans(page);
                  });
            } else {
                  button.disabled = true;
            }

            return button;
      }

      function updatePagination(totalPages, currentPage) {
            const paginationContainer = document.querySelector('nav[aria-label="Pagination"]');
            paginationContainer.innerHTML = '';

            const prevButton = createPaginationButton('previous', currentPage > 1 ? currentPage - 1 : null, currentPage);
            paginationContainer.appendChild(prevButton);

            for (let i = 1; i <= totalPages; i++) {
                  const pageButton = createPaginationButton(i, i, currentPage);
                  paginationContainer.appendChild(pageButton);
            }

            const nextButton = createPaginationButton('next', currentPage < totalPages ? currentPage + 1 : null, currentPage);
            paginationContainer.appendChild(nextButton);
      }

      artisansContainer.addEventListener('click', function (e) {
            if (e.target.classList.contains('contact-btn')) {
                  e.preventDefault();
                  modal.style.display = 'block';
            }
      });

      window.onclick = function (event) {
            if (event.target == modal) {
                  modal.style.display = 'none';
            }
      };

      document.getElementById('loginForm').addEventListener('submit', function (e) {
            e.preventDefault();
            modal.style.display = 'none';
      });

      loadArtisans(currentPage);

      applyFiltersButton.addEventListener('click', function (e) {
            e.preventDefault();
            currentPage = 1;
            loadArtisans(currentPage);
      });

      document.getElementById('sortBy').addEventListener('change', function () {
            currentPage = 1;
            loadArtisans(currentPage);
      });

      document.getElementById('searchArtisan').addEventListener('input', function () {
            currentPage = 1;
            loadArtisans(currentPage);
      });
});
