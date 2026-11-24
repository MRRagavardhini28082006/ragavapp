const searchInput = document.querySelector('#search-input');
const mediaTypeSelect = document.querySelector('#media-type-select');
const results = document.querySelector('#search-results');
const exampleSearch = document.querySelector('#example-search');

const mediaTypes = {
  movie: 'movie',
  drama: 'drama',
  webseries: 'web series',
  serial: 'serial'
};

function renderSearch() {
  const title = searchInput.value.trim();
  const mediaType = mediaTypeSelect.value;

  if (!title) {
    results.innerHTML = '<p class="empty-note">Search for a Tamil title to check where it is legally available in India.</p>';
    return;
  }

  const searchTerms = `${title} Tamil ${mediaTypes[mediaType]}`;
  const availabilityUrl = new URL('https://www.justwatch.com/in/search');
  availabilityUrl.searchParams.set('q', searchTerms);

  results.innerHTML = `<article class="availability-card">
    <p class="section-kicker">TAMIL · ${mediaTypes[mediaType].toUpperCase()}</p>
    <h3>${escapeHtml(title)}</h3>
    <p>Check legal streaming, rent, or purchase options in India. Tamil audio availability depends on the provider.</p>
    <a class="button button-light" href="${escapeHtml(availabilityUrl.href)}" target="_blank" rel="noopener noreferrer">Find where to watch <span aria-hidden="true">↗</span></a>
  </article>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

searchInput.addEventListener('input', renderSearch);
mediaTypeSelect.addEventListener('change', renderSearch);
exampleSearch.addEventListener('click', () => {
  searchInput.value = 'Jailer';
  mediaTypeSelect.value = 'movie';
  renderSearch();
  searchInput.focus();
});

renderSearch();
