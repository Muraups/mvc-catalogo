function loadData(endpoint, listId, formatter) {
  fetch(endpoint)
    .then((response) => response.json())
    .then((data) => {
      const listElement = document.getElementById(listId);
      listElement.innerHTML = ''; // Limpa a lista antes de preenchê-la
      data.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = formatter(item);
        listElement.appendChild(listItem);
      });
    })
    .catch((error) => console.error(`Erro ao carregar ${endpoint}:`, error));
}

const formatArtist = (artist) => `
  <strong>${artist.name}</strong> (Gênero: ${artist.Genre?.name || 'Não especificado'})
`;

async function loadGenres() {
  try {
    const response = await fetch('/api/genres');
    if (!response.ok) throw new Error('Erro ao carregar gêneros');
    const genres = await response.json();

    const genreSelect = document.getElementById('genre-select');
    genreSelect.innerHTML = '<option value="">Selecione o Gênero</option>'; // Adiciona a opção inicial

    genres.forEach((genre) => {
      const option = document.createElement('option');
      option.value = genre.id; // Usa o ID como valor
      option.textContent = genre.name; // Mostra o nome no dropdown
      genreSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Erro ao carregar gêneros:', error);
  }
}

document.getElementById('artist-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('artist-name').value;
  const genre_id = document.getElementById('genre-select').value;

  if (!genre_id) {
    alert('Por favor, selecione um gênero válido.');
    return;
  }

  try {
    const response = await fetch('/api/artists', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, genre_id }),
    });

    if (response.ok) {
      alert('Artista criado com sucesso!');
      loadData('/api/artists', 'artist-list', formatArtist);
    } else {
      const error = await response.json();
      alert('Erro ao criar artista: ' + error.message);
    }
  } catch (error) {
    console.error('Erro ao enviar dados:', error);
  }
});

// Carrega os gêneros e artistas ao iniciar a página
loadGenres();
loadData('/api/artists', 'artist-list', formatArtist);
