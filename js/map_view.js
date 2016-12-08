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

//create info window with InfoWindow() method
  var infoWindow = new google.maps.InfoWindow();

//loads information in an InfoWindow();
  function displayInfoWindow (marker, infowin) {
    if (infowin.marker != marker) {
      infowin.marker = marker;
      infowin.setContent('<div>' + marker.title + '</div>');
      infowin.open(map, marker);
      infowin.addListener('closeclick', function(){
        infowin.setMarker(null);
      });
    };
  };

  var position;
  var title;
  var defaultMarker = makeMarkerIcon();

//iterate through the locations array (from parksDB.js)
  for (i = 0; i < parkLocations.length; i++) {
    position = parkLocations[i].location;
    title = parkLocations[i].title;

//create marker object
    var marker = new google.maps.Marker({
      position: position,
      icon: defaultMarker,
      title: title,
      id: i
    });
//add marker in parks array, for every location
    parks.push(marker);
//add every item from parks array to map
    parks[i].setMap(map);
//runs the displayInfoWindow() function when the marker is clicked
    marker.addListener('click', function() {
      displayInfoWindow(this, infoWindow);
    })
  };
}

//creates marker icon
function makeMarkerIcon () {
  var markerImage = new google.maps.MarkerImage('img/tree.png');
  return markerImage;
}
