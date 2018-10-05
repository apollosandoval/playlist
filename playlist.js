(function() {
    let albumUrl = 'https://lit-fortress-6467.herokuapp.com/object';
    let playlistUrl = '';
    let scrollWrapper = document.querySelector('.scrolling-wrapper');
    let albums = [];
    let clearBtn = document.querySelector('#clearBtn');
    let submitBtn = document.querySelector('#submitBtn');
    let textArea = document.querySelector('.textarea');

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
        albumEl.innerHTML = `<img src='images/${album.cover_art}' id='${album.id}'>`

        scrollWrapper.appendChild(albumEl);
    }

    // event handlers
    let clearBin = function() {
        console.log('clear');
    }

    let postBin = function() {
        console.log('post');
    }

    let addToBin = function(event) {
        console.log(event.target.id);
        let album = albums.find(element => {
            return element['id'] == event.target.id;
        });
        // console.log(album);
        let info = document.createElement('p');
        info.textContent = `${album.artist}: ${album.title}`;
        textArea.appendChild(info);
    }

    // add event listeners
    clearBtn.addEventListener('click', clearBin);
    submitBtn.addEventListener('click', postBin);
    scrollWrapper.addEventListener('click', addToBin);
})();