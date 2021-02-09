


const searchSong = async() => {
    const searchText = document.getElementById('search-field').value;
    const url = ` https://api.lyrics.ovh/suggest/${searchText}`;
    try{
        const response = await fetch(url);
        const data = await response.json();
        displaySongs(data.data);
    }
    catch( error) {
        displayError = ('Something is wrong!!! please try again!!!')
    }
    
}


const displaySongs = (songs) => {
    const displaySongs = document.getElementById('songContainer');
    displaySongs.innerHTML = '';
    singleLyrics.innerText = '';

    songs.forEach(song => {
        const songDIv = document.createElement('div');
        songDIv.className = 'single-result row align-items-center my-3 p-3'
        songDIv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span> ${song.artist.name}</span></p>
                <audio controls>
                <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onClick="{getLyrics('${song.artist.name}', '${song.title}')}" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        displaySongs.appendChild(songDIv);


    });
}


const getLyrics = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(res => res.json())
    .then (data => displayLyrics(data.lyrics))

    .catch(error => displayError("Something is wrong!!! please try again!!!"));
}
// const getLyrics = async(artist, title) => {
//     const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     displayLyrics(data.lyrics);
// }
const singleLyrics = document.getElementById('singleLyrics');
const displayLyrics = (lyric) => {
    
    singleLyrics.innerText = lyric;
}

const displayError = (error) => {
    const setError = document.getElementById('error-massage');
    setError.innerText = error;
}