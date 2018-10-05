(function() {
    let albumUrl = 'https://lit-fortress-6467.herokuapp.com/object';
    let playlistUrl = '';
    let railroadContainer = document.querySelector('#tracks');
    let button = document.querySelector('#redirect');
    let albums = [];

    axios.get(albumUrl)
        .then ( response => {
            albums = response.data.results;
            
            let randomAlbums = noRepeatCovers(albums);
            randomAlbums.forEach( album => {
                generateAlbumCover(album);
            });
        })
        .catch( err => {
            console.log(err);
        })

    function noRepeatCovers(albumArray) {
        let randomCollection = [];
        let randomIndex = [];

        while (randomCollection.length < 3) {
            let randomNumber = Math.floor(Math.random() * albumArray.length);
            if (!randomIndex.includes(randomNumber)) {
                randomIndex.push(randomNumber);
                randomCollection.push(albumArray[randomNumber]);
            }
        }
        return randomCollection;
    }

    function generateAlbumCover(album) {
        let albumEl = document.createElement('div');

        albumEl.className = 'album_container row';
        albumEl.setAttribute('id', `album${album.id}`);
        albumEl.innerHTML = `<img src='images/${album.cover_art}'>`

        railroadContainer.appendChild(albumEl);
    }

    function redirect() {
        window.location = "./playlist.html";
    }

    // event listeners
    button.addEventListener('click', redirect);

    module.exports = { albums };
})();