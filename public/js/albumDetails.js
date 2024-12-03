document.addEventListener('DOMContentLoaded', async () => {
  const params = new URLSearchParams(window.location.search);
  const albumId = params.get('id');

  if (!albumId) {
    document.getElementById('album-details').innerHTML = '<p>Álbum não encontrado.</p>';
    return;
  }

  try {
    const response = await fetch(`/api/albums/${albumId}`);
    
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
    }

    const album = await response.json();

    if (!album) {
      document.getElementById('album-details').innerHTML = '<p>Álbum não encontrado.</p>';
      return;
    }

    const detailsSection = document.getElementById('album-details');
    detailsSection.innerHTML = `
      <h2>${album.title}</h2>
      <p><strong>Artista:</strong> ${album.Artist?.name || 'Desconhecido'}</p>
      <p><strong>Ano:</strong> ${album.release_year}</p>
      <p><strong>Gênero:</strong> ${album.Genres?.map(genre => genre.name).join(', ') || 'Não especificado'}</p>
      <img src="${album.cover_image || '/path/to/default/image.jpg'}" alt="${album.title}" style="width: 100%; max-width: 400px; border-radius: 8px;">
    `;

    const trackList = document.getElementById('track-list');
    if (album.Tracks && album.Tracks.length > 0) {
      album.Tracks.forEach(track => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${track.title}</strong> 
          (Duração: ${track.duration ? `${track.duration} minutos` : 'Não informada'})
        `;
        trackList.appendChild(li);
      });
    } else {
      trackList.innerHTML = '<p>Sem faixas disponíveis.</p>';
    }
  } catch (error) {
    document.getElementById('album-details').innerHTML = `<p>Erro ao carregar os detalhes do álbum: ${error.message}</p>`;
    console.error('Erro ao carregar detalhes do álbum:', error);
  }
});
