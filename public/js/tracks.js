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
  
  const formatTrack = track => `
  <strong>${track.title}</strong>
  (Álbum: ${track.Album?.title || 'Desconhecido'}, 
  Artista: ${track.Album?.Artist?.name || 'Desconhecido'}, 
  Duração: ${track.duration ? `${track.duration} minutos` : 'Não informada'})
`;

  async function loadAlbums() {
    try {
      const response = await fetch('/api/albums');
      if (!response.ok) throw new Error('Erro ao carregar álbuns');
      const albums = await response.json();
  
      console.log(albums); 
  
      const albumSelect = document.getElementById('album-select');
      albumSelect.innerHTML = '<option value="">Selecione o Álbum</option>'; 
  
      albums.forEach((album) => {
        const option = document.createElement('option');
        option.value = album.id;
        option.textContent = album.name;
        albumSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Erro ao carregar álbuns:', error);
    }
  }
  
  document.getElementById('track-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('track-name').value;
    const album_id = document.getElementById('album-select').value;
    const duration = document.getElementById('track-duration').value;
  
    if (!album_id || !duration) {
      alert('Por favor, selecione um álbum e insira a duração da faixa.');
      return;
    }
  
    try {
      const response = await fetch('/api/tracks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, album_id, duration }), 
      });
  
      if (response.ok) {
        alert('Faixa criada com sucesso!');
        loadData('/api/tracks', 'track-list', formatTrack); 
      } else {
        const error = await response.json();
        alert('Erro ao criar faixa: ' + error.message);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  });
  
  

  loadAlbums();
  loadData('/api/tracks', 'track-list', formatTrack);
  