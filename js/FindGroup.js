
// hide the overlay
$(".overlay").hide();


// on-click event to load the overlay when a group is selected
$(".groupRow").on("click", function() {
	$(".overlay").show();
});

$("#lightboxClose").on("click", function() {
	$(".overlay").hide();
});