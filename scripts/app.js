

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
          zoom: 2
        });

        var marker = new google.maps.Marker({
          position: {lat: 37.78, lng: -122.44},
          map: map,
          title: "San Francisco"
        });
      }


      function getTime() {

      }



      
