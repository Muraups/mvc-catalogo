document.addEventListener("DOMContentLoaded", () => {
    const artistForm = document.getElementById("artistForm");
    const artistList = document.getElementById("artists");
  
    // Função para carregar os artistas
    const loadArtists = async () => {
      const response = await fetch("/api/artists");
      const artists = await response.json();
      artistList.innerHTML = artists
        .map((artist) => `<li>${artist.name} - ${artist.genre.name}</li>`)
        .join("");
    };
  
    // Adicionar um novo artista
    artistForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const genre = document.getElementById("genre").value;
  
      await fetch("/api/artists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, genre }),
      });
  
      artistForm.reset();
      loadArtists();
    });
  
    // Carrega os artistas ao carregar a página
    loadArtists();
  });
  