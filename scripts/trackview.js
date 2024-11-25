document.addEventListener('DOMContentLoaded', () => {
    const trackList = document.getElementById('track-list');
    const form = document.getElementById('track-form');

    const loadTracks = async () => {
        const response = await fetch('http://localhost:3000/api/tracks');
        const tracks = await response.json();
        trackList.innerHTML = '';
        tracks.forEach(track => {
            const li = document.createElement('li');
            li.innerText = `${track.title} (Album: ${track.Album?.title || 'Unknown'})`;
            trackList.appendChild(li);
        });
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const title = document.getElementById('track-title').value;
        const albumId = document.getElementById('album-id').value;
        await fetch('http://localhost:3000/api/tracks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, album_id: albumId }),
        });
        loadTracks();
    });

    loadTracks();
});
