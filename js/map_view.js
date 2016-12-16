var parkLocations = [{
    title: "Morarilor Park",
    sector: 3,
    location: {
        lat: 44.440521,
        lng: 26.170378
    }
}, {
    title: "National Park",
    sector: 2,
    location: {
        lat: 44.434883,
        lng: 26.147718
    }
}, {
    title: "Titan Park",
    sector: 3,
    location: {
        lat: 44.422879,
        lng: 26.156130
    }
}, {
    title: "Vacaresti Natural Park",
    sector: 4,
    location: {
        lat: 44.399431,
        lng: 26.133342
    }
}, {
    title: "Plumbuita Park",
    sector: 2,
    location: {
        lat: 44.469806,
        lng: 26.135359
    }
}, {
    title: "Bordei Park",
    sector: 2,
    location: {
        lat: 44.471531,
        lng: 26.093903
    }
}, {
    title: "Herastrau Park",
    sector: 1,
    location: {
        lat: 44.479186,
        lng: 26.080599
    }
}, {
    title: "Bazilescu Park",
    sector: 1,
    location: {
        lat: 44.488668,
        lng: 26.034508
    }
}, {
    title: "Kiseleff Park",
    sector: 1,
    location: {
        lat: 44.457677,
        lng: 26.083603
    }
}, {
    title: "Cismigiu Park",
    sector: 1,
    location: {
        lat: 44.436660,
        lng: 26.091070
    }
}, {
    title: "Botanic Garden",
    sector: 6,
    location: {
        lat: 44.437273,
        lng: 26.062660
    }
}, {
    title: "The Youth Park",
    sector: 4,
    location: {
        lat: 44.406878,
        lng: 26.104460
    }
}, {
    title: "Carol Park",
    sector: 5,
    location: {
        lat: 44.413183,
        lng: 26.095533
    }
}, {
    title: "Drumul Taberei Park",
    sector: 6,
    location: {
        lat: 44.420024,
        lng: 26.032190
    }
}, {
    title: "Giulesti Park",
    sector: 6,
    location: {
        lat: 44.460531,
        lng: 26.043005
    }
}, {
    title: "Crangasi Park",
    sector: 6,
    location: {
        lat: 44.451735,
        lng: 26.043692
    }
}, {
    title: "Pantelimon Park",
    sector: 3,
    location: {
        lat: 44.436880,
        lng: 26.203208
    }
}, {
    title: "Constantin Brancusi Park",
    sector: 3,
    location: {
        lat: 44.429306,
        lng: 26.164799
    }
}, {
    title: "Gheorghe Patrascu Park",
    sector: 2,
    location: {
        lat: 44.431298,
        lng: 26.149778
    }
}, {
    title: "Opera Park",
    sector: 6,
    location: {
        lat: 44.436064,
        lng: 26.077273
    }
}, {
    title: "Izvor Park",
    sector: 5,
    location: {
        lat: 44.431637,
        lng: 26.087916
    }
}, {
    title: "Grozavesti Park",
    sector: 6,
    location: {
        lat: 44.436203,
        lng: 26.056416
    }
}, {
    title: "Queen Marie Park",
    sector: 1,
    location: {
        lat: 44.457815,
        lng: 26.066008
    }
}];

var map;

var selectedSector;
var markerList;

var ViewModel = function() {
  'use strict';
  var self = this;
  self.markerList = ko.observableArray();
//  self.filteredList = ko.observableArray(parkLocations);




  //constructor creates a new map, only center and zoom are required.
  var initializeMap = function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 44.426780, lng: 26.104116},
      zoom: 13,
      styles: styles,
      mapTypeControl: false
    });



  for (var i = 0; i < parkLocations.length; i++) {
    var position = parkLocations[i].location;
    var title = parkLocations[i].title;
    var sector = parkLocations[i].sector;
    var img = new google.maps.MarkerImage('img/park.png');
    var marker = new google.maps.Marker({
      map: map,
      sector: sector,
      title: title,
      position: position,
      animation: google.maps.Animation.DROP,
      icon: img,
      id: i
    });
    self.markerList.push(marker);
    selectedSector = ko.observable();

  self.clicker = function() {
    displayInfoWindow(this, infoWindow);
  };

  self.parkSector = function() {
    filterParks(parkLocations[i].sector, this);
  };

    marker.addListener('click', function() {
      displayInfoWindow(this, infoWindow);
    });


  } //for loop end



  //create info window with InfoWindow() method
  var infoWindow = new google.maps.InfoWindow();

    //  var makeMarkerIcon = function() {
    //    var markerImage = new google.maps.MarkerImage('img/tree.png');
    //    return markerImage;
    //  };

    //  var defaultMarker = makeMarkerIcon();

  } //initializeMap() end



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

//    marker.addListener('click', function() {
//      displayInfoWindow(this, infoWindow);
//    });


// load the map in the window
google.maps.event.addDomListener(window, 'load', initializeMap);
} //ViewModel() end






$(function(){
  ko.applyBindings(new ViewModel());
});
