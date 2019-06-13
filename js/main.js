console.log('Main!');

import locService from './services/loc.service.js'
import mapService from './services/map.service.js'

locService.getLocs()
    .then(locs => console.log('locs', locs))

document.body.onload = () => {
    mapService.initMap()
        .then(
            () => {
                mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
            }
        ).catch(console.warn);



    locService.getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}

// document.querySelector('.btn1').onclick =  () => {
//     console.log('Thanks!');
// }



document.querySelector('.go').addEventListener('click', (ev) => {
    const address = document.querySelector('.address').value;
    // if (places.length == 0) {
    //     return;
    // }
    // var bounds = new google.maps.LatLngBounds();
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            const loc = results[0].geometry.location;
            const lat = loc.lat();
            const lng = loc.lng();
            mapService.panTo(lat, lng);
            mapService.addMarker(loc);
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
})

document.querySelector('.meBtn').addEventListener('click', (ev) => {
    console.log('Aha!', ev.target);
    locService.getPosition()
        .then(pos => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            mapService.panTo(lat, lng);
        })
        .catch(err => {
            console.log('err!!!', err);
        })
})
