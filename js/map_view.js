var parkLocations = [{
    title: "Morarilor Park",
    sector: "Sector 3",
    location: {
        lat: 44.440521,
        lng: 26.170378
    }
}, {
    title: "National Park",
    sector: "Sector 2",
    location: {
        lat: 44.434883,
        lng: 26.147718
    }
}, {
    title: "Titan Park",
    sector: "Sector 3",
    location: {
        lat: 44.422879,
        lng: 26.156130
    }
}, {
    title: "Vacaresti Natural Park",
    sector: "Sector 4",
    location: {
        lat: 44.399431,
        lng: 26.133342
    }
}, {
    title: "Plumbuita Park",
    sector: "Sector 2",
    location: {
        lat: 44.469806,
        lng: 26.135359
    }
}, {
    title: "Bordei Park",
    sector: "Sector 2",
    location: {
        lat: 44.471531,
        lng: 26.093903
    }
}, {
    title: "Herastrau Park",
    sector: "Sector 1",
    location: {
        lat: 44.479186,
        lng: 26.080599
    }
}, {
    title: "Bazilescu Park",
    sector: "Sector 1",
    location: {
        lat: 44.488668,
        lng: 26.034508
    }
}, {
    title: "Kiseleff Park",
    sector: "Sector 1",
    location: {
        lat: 44.457677,
        lng: 26.083603
    }
}, {
    title: "Cismigiu Park",
    sector: "Sector 1",
    location: {
        lat: 44.436660,
        lng: 26.091070
    }
}, {
    title: "Botanic Garden",
    sector: "Sector 6",
    location: {
        lat: 44.437273,
        lng: 26.062660
    }
}, {
    title: "The Youth Park",
    sector: "Sector 4",
    location: {
        lat: 44.406878,
        lng: 26.104460
    }
}, {
    title: "Carol Park",
    sector: "Sector 5",
    location: {
        lat: 44.413183,
        lng: 26.095533
    }
}, {
    title: "Drumul Taberei Park",
    sector: "Sector 6",
    location: {
        lat: 44.420024,
        lng: 26.032190
    }
}, {
    title: "Giulesti Park",
    sector: "Sector 6",
    location: {
        lat: 44.460531,
        lng: 26.043005
    }
}, {
    title: "Crangasi Park",
    sector: "Sector 6",
    location: {
        lat: 44.451735,
        lng: 26.043692
    }
}, {
    title: "Pantelimon Park",
    sector: "Sector 3",
    location: {
        lat: 44.436880,
        lng: 26.203208
    }
}, {
    title: "Constantin Brancusi Park",
    sector: "Sector 3",
    location: {
        lat: 44.429306,
        lng: 26.164799
    }
}, {
    title: "Gheorghe Patrascu Park",
    sector: "Sector 2",
    location: {
        lat: 44.431298,
        lng: 26.149778
    }
}, {
    title: "Opera Park",
    sector: "Sector 6",
    location: {
        lat: 44.436064,
        lng: 26.077273
    }
}, {
    title: "Izvor Park",
    sector: "Sector 5",
    location: {
        lat: 44.431637,
        lng: 26.087916
    }
}, {
    title: "Grozavesti Park",
    sector: "Sector 6",
    location: {
        lat: 44.436203,
        lng: 26.056416
    }
}, {
    title: "Queen Marie Park",
    sector: "Sector 1",
    location: {
        lat: 44.457815,
        lng: 26.066008
    }
}];



var ViewModel = function() {
  'use strict';
  var self = this;
  var map;
  var allMarkers = [];


  self.markerList = ko.observableArray([]);
//  self.currentMarker = ko.observable(this.markerList()[0]);

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
    var img = new google.maps.MarkerImage('img/park.png');
    var marker = new google.maps.Marker({
      map: map,
      title: title,
      position: position,
      animation: google.maps.Animation.DROP,
      icon: img,
      id: i
    });
    self.markerList.push(marker);
    marker.addListener('click', function() {
      displayInfoWindow(this, infoWindow);
    });
  } //for loop end

  //create info window with InfoWindow() method
  var infoWindow = new google.maps.InfoWindow();

    //  var position;
    //  var title;


    //  var makeMarkerIcon = function() {
    //    var markerImage = new google.maps.MarkerImage('img/tree.png');
    //    return markerImage;
    //  };

    //  var defaultMarker = makeMarkerIcon();

    //loads information in an InfoWindow();

  } //initializeMap() end



  function displayInfoWindow (marker, infowin) {
    if (infowin.marker != marker) {
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

//  self.populateLocations = function() {

//  };
// load the map in the window
google.maps.event.addDomListener(window, 'load', initializeMap);
} //ViewModel() end




$(function(){
  ko.applyBindings(new ViewModel());
});
