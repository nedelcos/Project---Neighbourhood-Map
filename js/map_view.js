var map;
//var marker;
//var parkItem;

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


var Park = function (data) {
    "use strict";
    this.title = ko.observable(data.title);
    this.position = ko.observable(data.position);
    this.count = ko.observable(data.count);
    this.marker = ko.observable(data.marker);

};


var ViewModel = function() {
  'use strict';
  var self = this;

  self.markerList = ko.observableArray([]);

  //create info window with InfoWindow() method
  var infoWindow = new google.maps.InfoWindow();

  parkLocations.forEach(function (parkItem) {
      self.markerList.push(new Park(parkItem));
      position = parkItem.position;
  });




  var marker;
  var position;

  self.markerList().forEach(function (parkItem) {
    var position = parkItem.position();
    var title = parkItem.title();
      marker = new google.maps.Marker({
          position: position,
          title: title,
          map: map,
          icon: new google.maps.MarkerImage('img/park.png'),
          animation: google.maps.Animation.DROP
      });
      parkItem.marker = marker;

      self.clicker = function() {
        displayInfoWindow(this.marker, infoWindow);
      };

      marker.addListener('click', function() {
        displayInfoWindow(this, infoWindow);
      });

  });



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
