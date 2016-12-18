var map;

//This is the function that initializez the map
var initializeMap = function() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 44.426780, lng: 26.104116},
    zoom: 13,
    styles: styles,
    mapTypeControl: false
  });

  ko.applyBindings(new ViewModel());
} //initializeMap() end

//Object constructor that creates each park object
var Park = function (data) {
    "use strict";
    this.title = ko.observable(data.title);
    this.position = ko.observable(data.position);
    this.count = ko.observable(data.count);
    this.marker = ko.observable(data.marker);
    this.sector = ko.observable(data.sector);
};


var ViewModel = function() {
  'use strict';
  var self = this;

  //observable array containing all parks
  self.markerList = ko.observableArray([]);

  //create info window with InfoWindow() method
  var infoWindow = new google.maps.InfoWindow();

  //iterates through the initial park array (from parksDB.js file) and pushes each array item
  //into the markerList observable array
  parkLocations.forEach(function (parkItem) {
      self.markerList.push(new Park(parkItem));
      position = parkItem.position;
  });

  var marker;
  var position;

  //creates google maps marker for each new park
  self.markerList().forEach(function (parkItem) {
    var position = parkItem.position();
    var title = parkItem.title();
      marker = new google.maps.Marker({
          position: position,
          title: title,
          map: map,
          icon: new google.maps.MarkerImage('img/park.png'),
          animation: google.maps.Animation.DROP,
      });
      parkItem.marker = marker;

      self.clicker = function() {
        displayInfoWindow(this.marker, infoWindow);
      };

      marker.addListener('click', function() {
        displayInfoWindow(this, infoWindow);
      });
  });

  //TODO: it is suposed to hold the value from the selected sector
  this.selectedSector = ko.observable("");

  //Clears all markers from map
  function clearMap() {
    self.markerList().forEach(function (parkItem) {
      parkItem.marker.setMap(null);
    });
  };

  //TODO: This switch statement is suposed to filter my Parks based on their sector
  this.listSector = function() { //listSector() function is called with knockout, when selecting a sector
    clearMap();
    switch(this.selectedSector()) { //the selectedSector observable is suposed to hold the value for the selected sector
      case 1:
        console.log(parkItem.sector())
        self.markerList().forEach(function (parkItem) {
          if (parkItem.sector() = 1) {
            parkItem.marker.setMap(map);
          }
        });
        break;
      case 2:
        console.log(parkItem.sector())
        self.markerList().forEach(function (parkItem) {
          if (parkItem.sector() = 2) {
            parkItem.marker.setMap(map);
          }
        });
        break;
      case 3:
        console.log(parkItem.sector())
        self.markerList().forEach(function (parkItem) {
          if (parkItem.sector() = 3) {
            parkItem.marker.setMap(map);
          }
        });
        break;
      case 4:
        console.log(parkItem.sector())
        self.markerList().forEach(function (parkItem) {
          if (parkItem.sector() = 4) {
            parkItem.marker.setMap(map);
          }
        });
        break;
      case 5:
        console.log(parkItem.sector())
        self.markerList().forEach(function (parkItem) {
          if (parkItem.sector() = 5) {
            parkItem.marker.setMap(map);
          }
        });
        break;
      case 6:
        console.log(parkItem.sector())
        self.markerList().forEach(function (parkItem) {
          if (parkItem.sector() = 6) {
            parkItem.marker.setMap(map);
          }
        });
        break;
    }
  }

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
