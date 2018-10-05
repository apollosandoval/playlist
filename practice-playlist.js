(function() {
    let albumUrl = 'https://lit-fortress-6467.herokuapp.com/object';
    let playlistUrl = 'https://lit-fortress-6467.herokuapp.com/post';
    let albums = [];
    let stagingBin = [];
    let scrollWrapper = document.querySelector('.scrolling-wrapper');
    let clearBtn = document.querySelector('#clearBtn');
    let submitBtn = document.querySelector('#submitBtn');
    let textArea = document.querySelector('.textarea');

    axios.get(albumUrl)
        .then(response => {
            albums = response.data.results;

            albums.forEach(album => {
                generateAlbumCover(album);
            })
        })
        .catch(err => {
            console.log(err);
        })
    
    function generateAlbumCover(album) {
        let albumEl = document.createElement('span');

        albumEl.className = 'album-thumbnail';
        albumEl.setAttribute('id', `album${album.id}`);
        albumEl.innerHTML = `<img src='images/${album.cover_art}' id='${album.id}'>`

        scrollWrapper.appendChild(albumEl);
    }
    
    // event handlers
    let clearBin = function () {
        stagingBin = [];

        while (textArea.firstChild) {
            textArea.removeChild(textArea.firstChild);
        }
    }

    let postBin = function () {
        axios.post(playlistUrl, stagingBin)
            .then(response => {
                clearBin();
            })
            .catch(error => {
                console.log(error);
            })
    }

    let addToBin = function (event) {
        let album = albums.find(element => {
            return element['id'] == event.target.id;
        });

        stagingBin.push(album);
        let info = document.createElement('p');
        info.textContent = `${album.artist}: ${album.title}`;
        textArea.appendChild(info);
    }

    // add event listeners
    clearBtn.addEventListener('click', clearBin);
    submitBtn.addEventListener('click', postBin);
    scrollWrapper.addEventListener('click', addToBin);
})()