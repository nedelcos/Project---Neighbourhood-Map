//Global variables
var map;
var parks = []; //Stores all parks in this array

function initMap() {
  //constructor creates a new map, only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.426780, lng: 26.104116},
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  });
}
