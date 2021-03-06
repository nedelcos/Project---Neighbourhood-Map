ko.options.deferUpdates = true;

var map, infoWindow;

//This object holds the forsqare api credentials
var forsqare = {
  id: 'NWYE5SXY1XOXPBCEMAJJKJRDMQFLEVGEN1YQPU3EUIR02RFV',
  secret: 'NMEUQSYSLXU4UUDO1YHKBTMIXH3GXT1GHRFNJ13HVQATCCUN'
};


//This is the function that initializez the map
var initializeMap = function() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 44.426780,
                lng: 26.104116
            },
            zoom: 13,
            styles: styles,
            mapTypeControl: false
        });

        //creates info window with InfoWindow() method
        infoWindow = new google.maps.InfoWindow();

        ko.applyBindings(new ViewModel());
    }; //initializeMap end


//Object constructor that creates each park object
var Park = function(data) {
    "use strict";
    this.title = ko.observable(data.title);
    this.lat = ko.observable(data.position.lat);
    this.lng = ko.observable(data.position.lng);
    this.marker = ko.observable(data.marker);
    this.sector = ko.observable(data.sector);
    this.content = ko.observable(data.content);
};


var ViewModel = function() {
        'use strict';
        var self = this;
        var marker, position, parkTitle;

        //observable array containing all parks
        self.markerList = ko.observableArray([]);

        //iterates through the initial park array (from parksDB.js file) and pushes each array item
        //into the markerList observable array
        parkLocations.forEach(function(parkItem) {
            self.markerList.push(new Park(parkItem));
            position = parkItem.position;
            parkTitle = parkItem.title;
        });

        //Clears all markers from map and sets the ones from the selected category (sector)
        this.clearMap = function() {
            this.markerList().forEach(function(parkItem) {
                parkItem.marker.setMap(null);
            });
            this.parksBySector().forEach(function(parkItem) {
                parkItem.marker.setMap(map);
            });
        };

        //Array containing park categories (sectors of the city - Bucharest)
        this.parkSectors = ko.observableArray(["Sector 1", "Sector 2", "Sector 3", "Sector 4", "Sector 5", "Sector 6"]);

        //hold the value from the selected sector
        this.selectedSector = ko.observableArray([]);

        //filters markers, based on the selected category (sector)
        this.parksBySector = ko.computed(function() {
            if (self.selectedSector().length === 0) {
                return self.markerList();
            } else {
                return ko.utils.arrayFilter(self.markerList(), function(parkItem) {
                    var sector = parkItem.sector();
                    var match = self.selectedSector().includes(parkItem.sector());
                    return match;
                });
            }
        });

        //Iterates through the markers AFTER they are filtered
        this.parksBySector().forEach(function(parkItem) {


            // Foursquare rating API
            $.ajax({
                url: 'https://api.foursquare.com/v2/venues/explore',
                data: 'limit=1&ll=' + parkItem.lat() + ',' + parkItem.lng() + '&query=' + parkItem.title + '&client_id=' + forsqare.id + '&client_secret=' + forsqare.secret + '&v=201408066&m=foursquare',
                aync: true,
                success: function(data) {
                    parkItem.rating = data.response.groups[0].items[0].venue.rating;
                    parkItem.title = parkItem.title();
                    marker.content = '<div class="title"><strong>' + parkItem.title + '</strong></div><div class="rating">Foursquare rating: ' + parkItem.rating + '</div>';
                      marker.setMap(map);

                },
                error: function(data) {
                    parkItem.title = parkItem.title();
                    marker.content = '<div class="title"><strong>' + parkItem.title + '</strong></div><div><br>No data from Forsquare :(<br>Please check your internet connection or try again later</div>';
                      marker.setMap(map);
                }

            });

            // create markers
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(parkItem.lat(), parkItem.lng()),
                title: parkItem.title(),
                //map: map,
                content: "<strong>" + parkItem.title() + "</strong><br>Frosquare data has not finished loading. Click marker again for rating :) ",
                animation: google.maps.Animation.DROP,
                icon: new google.maps.MarkerImage('img/park.png')
            });

            parkItem.marker = marker;

            //This function is called via. knockoutJs - from the markers list view
            self.clicker = function() {
              var clickedPark = this;
              infoWindow.setContent(clickedPark.marker.content);
              infoWindow.open(map, clickedPark.marker);
              clickedPark.marker.setAnimation(google.maps.Animation.BOUNCE);
              setTimeout(function() {
                  clickedPark.marker.setAnimation(null);
              }, 1450);
              map.panTo(clickedPark.marker.position);
            };

            //Run function when marker is clicked
            google.maps.event.addListener(marker, 'click', function() {
                infoWindow.setContent(marker.content);
                infoWindow.open(map, this);
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    marker.setAnimation(null);
                }, 1450);
                map.panTo(marker.position);
            });
      });
}; //ViewModel end

//This fucntion is called via the script tag for the google maps api
function mapsError() {
  alert("Google maps was unable to load. Please check your internet connection or try again later :)");
}
