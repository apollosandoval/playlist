(function() {
    let albumUrl = 'https://lit-fortress-6467.herokuapp.com/object';
    let playlistUrl = '';

    axios.get(albumUrl)
        .then ( response => {
            let albums = response.data.results;
            
            let randomAlbums = noRepeatCovers(albums);
            console.log(randomAlbums);
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

    function populateTracks(albumArray) {
        
    }
})();