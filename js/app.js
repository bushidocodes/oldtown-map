
//Google Maps Functionality
var map;

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 38.805, lng: -77.05},
    zoom: 15
});
}
