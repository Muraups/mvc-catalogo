function loadData(endpoint, listId, formatter) {
    fetch(endpoint)
      .then((response) => response.json())
      .then((data) => {
        const listElement = document.getElementById(listId);
        listElement.innerHTML = ''; 
        data.forEach((item) => {
          const listItem = document.createElement('li');
          listItem.innerHTML = formatter(item);
          listElement.appendChild(listItem);
        });
      })
      .catch((error) => console.error(`Erro ao carregar ${endpoint}:`, error));
  }
  
  const formatAlbum = (album) => `
  <li style="border: 1px solid #ddd; border-radius: 8px; padding: 10px; width: 200px; text-align: center; background-color: #f9f9f9;">
    <a href="/html/album-details.html?id=${album.id}" style="text-decoration: none; color: inherit;">
      <img src="${album.cover_image || '/path/to/default/image.jpg'}" alt="${album.title}" style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 10px;">
      <strong>${album.title}</strong>
      <p>Artista: ${album.Artist?.name || 'Desconhecido'}</p>
      <p>Ano: ${album.release_year || 'N/A'}</p>
    </a>
  </li>
`;

  async function loadArtists() {
    try {
      const response = await fetch('/api/artists');
      if (!response.ok) throw new Error('Erro ao carregar artistas');
      const artists = await response.json();
  
      const artistSelect = document.getElementById('artist-select');
      artistSelect.innerHTML = '<option value="">Selecione o Artista</option>'; 
  
      artists.forEach((artist) => {
        const option = document.createElement('option');
        option.value = artist.id; 
        option.textContent = artist.name; 
        artistSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Erro ao carregar artistas:', error);
    }
  }
  
  document.getElementById('album-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('album-name').value;
    const artist_id = document.getElementById('artist-select').value;
  
    if (!artist_id) {
      alert('Por favor, selecione um artista válido.');
      return;
    }
  
    try {
      const response = await fetch('/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, artist_id }),
      });
  
      if (response.ok) {
        alert('Álbum criado com sucesso!');
        loadData('/api/albums', 'album-list', formatAlbum);
      } else {
        const error = await response.json();
        alert('Erro ao criar álbum: ' + error.message);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  });
  

  loadArtists();
  loadData('/api/albums', 'album-list', formatAlbum);
  