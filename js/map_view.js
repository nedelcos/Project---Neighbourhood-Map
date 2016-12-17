var map;
var marker;

//constructor creates a new map, only center and zoom are required.
var initializeMap = function() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.426780, lng: 26.104116},
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  });

  ko.applyBindings(new ViewModel());
} //initializeMap() end


var ViewModel = function() {
  'use strict';
  var self = this;

  this.markerList = ko.observableArray([]);

  //create info window with InfoWindow() method
  var infoWindow = new google.maps.InfoWindow();

  for (var i = 0; i < parkLocations.length; i++) {
    var position = parkLocations[i].location;
    var title = parkLocations[i].title;
    var sector = parkLocations[i].sector;
    var img = new google.maps.MarkerImage('img/park.png');
    marker = new google.maps.Marker({
      map: map,
      sector: sector,
      title: title,
      position: position,
      animation: google.maps.Animation.DROP,
      icon: img,
      id: i
    });
    self.markerList.push(marker);

    self.clicker = function() {
      displayInfoWindow(this, infoWindow);
    };

    marker.addListener('click', function() {
      displayInfoWindow(this, infoWindow);
    });

  } //for loop end

} //ViewModel() end

//animates marker and loads information in an InfoWindow();
var displayInfoWindow = function(marker, infowin) {
  if (infowin.marker != marker) {
    marker.setAnimation(google.maps.Animation.BOUNCE);
    setTimeout(function(){
      marker.setAnimation(null);
    }, 1450);
    map.panTo(marker.position);
    infowin.marker = marker;
    infowin.setContent('<div>' + marker.title + '</div>');
    infowin.open(map, marker);
    infowin.addListener('closeclick', function(){
      infowin.setMap(null);
    });
  };
};
