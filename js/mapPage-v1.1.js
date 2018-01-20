 // This example requires the Places library. Include the libraries=places
      // parameter when you first load the API. For example:
      // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

      var map;
      var infowindow;
      var restaurants = [];

      var restaurantName;
      var restaurantAddress;
      var restaurantRating;
      var restaurantPrice;

      var groupName;
      var groupDate;
      var groupParticipants;
      var groupTime;
      var groupTheme;



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

            createMarker(results[i], label);

            $("#well").append(
            	"<h2>" + label + ": " + results[i].name + "</h2>" +
            	"<p><strong>Rating: </strong>" + results[i].rating + "</p>" +
            	"<p><strong>Price Level: </strong>" + results[i].price_level + "</p>" +
            	"<p><strong>Address: </strong>" + results[i].vicinity + "</p>" +
            	"<button id='" + id + "'>Select Restaurant</button>" +
            	"<br>");

            createClickEvent(id, i);

            updateRestaurantsList(results[i]);
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

      function createClickEvent(id, i) {
	      $("#"+id).on("click", function() {
	      	$(".overlay").show();

          restaurantName = restaurants[i].name;
          restaurantAddress = restaurants[i].address;
          restaurantRating = restaurants[i].rating;
          restaurantPrice = restaurants[i].price;

          console.log(restaurantName, restaurantAddress, restaurantRating, restaurantPrice);

	      });
  		}


      function updateRestaurantsList(results) {
         restaurants.push({
                "name" : results.name,
                "rating" : results.rating,
                "price" : results.price_level,
                "address" : results.vicinity
             });
      }
      
      $("#createGroupBtn").on("click", function(event) {

        event.preventDefault();

        groupName = $("#groupName").val();
        groupDate = $("#groupDate").val();
        groupParticipants = $("#groupParticipants").val();
        groupTime = $("#groupTime").val();
        groupTheme = $("#groupTheme").val();

        window.location.href = "myGroups.html";

        console.log(groupName, groupDate, groupParticipants, groupTime, groupTheme);

      });



