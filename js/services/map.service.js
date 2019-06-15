
export default {
    initMap,
    addMarker,
    panTo
}


var map;

function initMap(lat = 31.9893978, lng = 34.7715917) {
    console.log('InitMap');

    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            map = new google.maps.Map(
                document.querySelector('#map'), {
                    center: { lat, lng },
                    zoom: 15
                })
            console.log('Map!', map);
        })
}

function addMarker(loc, address) {
    var marker = new google.maps.Marker({
        position: loc,
        map: map,
        animation: google.maps.Animation.DROP,
        label: address,
        // draggable:true,
        title: address
    });
    console.log('marker', marker);
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    map.panTo(laLatLng);
}

function _connectGoogleApi() {
    if (window.google) return Promise.resolve();
    const API_KEY = 'AIzaSyBYkjozA7Homec78H8vBEfsXoZSFkjwBac';
    // const API_KEY = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBYkjozA7Homec78H8vBEfsXoZSFkjwBac';
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
        // elGoogleApi.onerror = reject.bind(null,'Google script failed to load')
    })
}



