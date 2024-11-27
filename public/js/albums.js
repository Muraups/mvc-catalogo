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
  
  const formatAlbum = (album) => `
  <strong>${album.name || album.title || 'Nome não especificado'}</strong> (Artista: ${album.Artist?.name || 'Não especificado'})
`;
  
  async function loadArtists() {
    try {
      const response = await fetch('/api/artists');
      if (!response.ok) throw new Error('Erro ao carregar artistas');
      const artists = await response.json();
  
      const artistSelect = document.getElementById('artist-select');
      artistSelect.innerHTML = '<option value="">Selecione o Artista</option>'; // Adiciona a opção inicial
  
      artists.forEach((artist) => {
        const option = document.createElement('option');
        option.value = artist.id; // Usa o ID como valor
        option.textContent = artist.name; // Mostra o nome no dropdown
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
  
  // Carrega os artistas e álbuns ao iniciar a página
  loadArtists();
  loadData('/api/albums', 'album-list', formatAlbum);
  