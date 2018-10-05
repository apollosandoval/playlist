(function() {
    let albumUrl = 'https://lit-fortress-6467.herokuapp.com/object';
    let playlistUrl = '';
    let scrollWrapper = document.querySelector('.scrolling-wrapper');
    let albums = [];

    axios.get(albumUrl)
        .then( response => {
            albums = response.data.results;
            
            albums.forEach( album => {
                generateAlbumCover(album);
            })
        })
        .catch( err => {
            console.log(err);
        })
    
    function generateAlbumCover(album) {
        let albumEl = document.createElement('div');

        albumEl.className = 'album_container';
        albumEl.setAttribute('id', `album${album.id}`);
        albumEl.innerHTML = `<img src='images/${album.cover_art}'>`

        scrollWrapper.appendChild(albumEl);
    }
})();