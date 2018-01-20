 // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">


// GLOBAL VARIABLES HERE

      var map;
      var infowindow;

      // array to capture all of the restaurant information

      var restaurants = [];
    
      var restaurantName;
      var restaurantAddress;
      var restaurantRating;
      var restaurantPrice;



// Hide the overlay when opening the page (not ideal solution... may flicker)
      $(".overlay").hide();

      function initMap() {
        var pyrmont = {lat: 41.896294, lng: -87.618799};

        map = new google.maps.Map(document.getElementById('map'), {
          center: pyrmont,
          zoom: 15
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: pyrmont,
          radius: 800,
          type: ['restaurant']
        }, callback);
      }

      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
          	var label0 = i + 1;
            var label = label0.toString();
            var id = "restaurant" + label;

             // populate the restaurants array with each restaurant

             restaurants[i].push({
                "name"=results[i].name,
                "rating"=results[i].rating,
                "price"=results[i].price_level,
                "address"==results[i].vicinity
             })

            createMarker(results[i], label);
            console.log(results[i]);
            $("#well").append(
            	"<h2>" + label + ": " + results[i].name + "</h2>" +
            	"<p><strong>Rating: </strong>" + results[i].rating + "</p>" +
            	"<p><strong>Price Level: </strong>" + results[i].price_level + "</p>" +
            	"<p><strong>Address: </strong>" + results[i].vicinity + "</p>" +
            	"<button id='" + id + "'>Select Restaurant</button>" +
            	"<br>");
            createClickEvent(id);
          }
        }
      }

      function createMarker(place, label) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
          label: label
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);
        });
      }

      function createClickEvent(id) {


	      $("#"+id).on("click", function() {
	      	$(".overlay").show();
	      });
  		}