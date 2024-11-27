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
  
  const formatGenre = (genre) => `
    <strong>${genre.name}</strong>
  `;
  
  document.getElementById('genre-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('genre-name').value;
  
    try {
      const response = await fetch('/api/genres', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });
  
      if (response.ok) {
        alert('Gênero criado com sucesso!');
        loadData('/api/genres', 'genre-list', formatGenre);
      } else {
        const error = await response.json();
        alert('Erro ao criar gênero: ' + error.message);
      }
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
    }
  });
  
  
  loadData('/api/genres', 'genre-list', formatGenre);
  