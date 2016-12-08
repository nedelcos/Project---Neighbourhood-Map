//Global variables
var map;
var parks = []; //Stores all parks in this array


// initMap() loads the map with the specified parameters
function initMap() {
  //constructor creates a new map, only center and zoom are required.
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.426780, lng: 26.104116},
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  });


  var position;
  var title;
  var defaultMarker = makeMarkerIcon();

  for (i = 0; i < parkLocations.length; i++) {
    position = parkLocations[i].location;
    title = parkLocations[i].title;

    var marker = new google.maps.Marker({
      position: position,
      icon: defaultMarker,
      title: title,
      id: i
    });

    parks.push(marker);

    parks[i].setMap(map);
  };

}

function makeMarkerIcon () {
  var markerImage = new google.maps.MarkerImage('img/tree.png');
  return markerImage;
}
