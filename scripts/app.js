document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/api/albums');
    const albums = await response.json();

    const app = document.getElementById('app');
    albums.forEach(album => {
        const albumDiv = document.createElement('div');
        albumDiv.innerHTML = `
            <h2>${album.title}</h2>
            <p>Release Year: ${album.release_year}</p>
            <p>Artist: ${album.Artist.name}</p>
        `;
        app.appendChild(albumDiv);
    });
});
