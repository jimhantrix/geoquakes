

// defiene globals GEO-QUAKES//

var weekly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson";
var $quakesList;
var map;
var template;

$(document).on("ready", function() {
    initMap();
      $quakesList = $.ajax ({
      method:"GET",
      url:weekly_quakes_endpoint
  })
  .done(function(data){
    var earthquake = data.features;
    var source =   $("#quakes-template").html();
    template = Handlebars.compile(source);
    var quakesTemplate = template({quakes:earthquake});
    $("#info").append(quakesTemplate);

    earthquake.forEach(function(quakes){
      var lat = quakes.geometry.coordinates[1];
      var lng = quakes.geometry.coordinates[0];

      new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        map: map,
        title: quakes.properties.title
        });
    });
  })
  .fail(function(response){
    console.log('Error',response);
  });

});

 function initMap() {
          map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 37.78, lng: -122.44},
          zoom: 4
        });

        var marker = new google.maps.Marker({
          position: {lat: 37.78, lng: -122.44},
          map: map,
          title: "San Francisco"
        });
      }

      function drop() {
        clearMarkers();
        for (var i = 0; i<position.length; i++) {
          addMarkerWithTimeout(title[i], i * 200);
        }
      }

      function addMarkerWithTimeout(position, title) {
        window.setTimeout(function() {
          markers.push(new google.maps.Marker({
            position:{lat: 37.78, lng: -122.44},
            map: map,
            animation: google.maps.Animation.DROP
          }));
        }, timeout);
      }

      function clearMarkers() {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(null);
        }

      }

      // Handlebars.registerHelper('hoursAgo', function(time) {
      //      var hoursAgo = Math.round((Date.now() - time)/(1000*60*60));
      //      return hoursAgo + ' hours ago';
      //    });
