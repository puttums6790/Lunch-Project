
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBvEEsX_emQu9Um3wzAgNZv0m2I9WBDuVg",
  authDomain: "lunch-group-project.firebaseapp.com",
  databaseURL: "https://lunch-group-project.firebaseio.com",
  projectId: "lunch-group-project",
  storageBucket: "",
  messagingSenderId: "442112808193"
};

firebase.initializeApp(config);
var database = firebase.database();



//initializing variables
var buttonPressed;
var newLink;
var userExists;
var groupName;
var groupTheme;
var groupTime;
var groupParticipants;
var groupDate;
var isLoggedIn;



//sets users initial logged in status based on session storage

isLoggedIn = sessionStorage.getItem('isLoggedIn');

if (isLoggedIn == null) {
  isLoggedIn = false;
}

if (isLoggedIn == "false") {
  isLoggedIn = false;
  $("#loginLink").text("");
}

if (isLoggedIn == "true") {
  isLoggedIn = true;
  $("#loginLink").text("Logout");
}



//function to check if user is logged in already
function checkLogin(path) {
  
  //if a button to go to a specifc page is clicked
  if(path) {

    //goes to link location page if user is logged in
    if (isLoggedIn) {
      window.location = path +'.html';
      
    } 
    //shows login box if user is not logged in
    else {
      $('#loginScreen').show();
    }
  } 

  //goes back to home page after submit button clicked on log in screen
  else {
    if(isLoggedIn) {
      window.location = "index.html";
    }
  }
}



//makes table of your groups - runs when My Groups page loads
function refreshMyGroups() {

  //get username from session storage
  var username = sessionStorage.getItem("username", username);

  //pull user's groups from firebase
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    const userData = childSnapshot.val()[username]["MyGroups"];
    var tableCount = 0;

    //loops through firebase groups to display in table
    for(var groupId in userData) {
      tableCount++
      var id = groupId;
      var data = userData[id]

      //appends each firebase stored element to it's respective table column
      $("#myGroupsTable > tbody").append("<tr><td>" + tableCount + "</td><td>" 
        + userData[id].groupName + "</td><td>" + userData[id].groupDate + "</td><td>" 
        + userData[id].groupTime + "</td><td>" + userData[id].groupParticipants + "</td><td>" 
        + userData[id].groupTheme + "</td><td>" +userData[id].restaurantName+ "</td><td>" 
        + userData[id].restaurantAddress + "</td><td>" +"<button class='leaveButton'id="+ id +">Remove Group</button>"+"</td></tr>");
    }

    //if a delete group button is clicked, removes it from firebase and reloads page
    $(".leaveButton").on("click", function(event) {
      event.preventDefault();
      var removeID = $(this).attr("id");
      database.ref().child("Users").child(username).child("MyGroups").child(removeID).remove();
      window.location = 'myGroups.html';
    })
  })
}



//function add a new group - runs when "create group" button is clicked
function addGroup() {

  //gets values for group info from user input
  groupName = $("#groupName").val().trim();
  groupParticipants = $("#groupParticipants").val().trim();
  groupTheme = $("#groupTheme").val().trim();
  groupDate = $("#groupDate").val().trim();
  groupTime = $("#groupTime").val().trim();

  //gets username from session storage
  var username = sessionStorage.getItem("username", username);

  //adds group info to firebase
  database.ref().child("Users").child(username).child("MyGroups").push({
    groupName: groupName,
    groupTime: groupTime,
    groupDate: groupDate,
    groupParticipants: groupParticipants,
    groupTheme: groupTheme,
    restaurantName: restaurantName,
    restaurantAddress: restaurantAddress
  });
}



//on home screen, if button on nav bar or to go to another page is clicked
$(".btn-lg").on("click", function(event) {

  //determins id of button pressed
  buttonPressed = $(this).attr("id");

  //checks if logged in and acts according to function
  checkLogin(buttonPressed);

})



//on home screen, login/logout is clicked
$("#loginLink").on("click", function(event) {

  isLoggedIn = false;

  //Clear localStorage
  sessionStorage.clear();

  window.location = 'index.html';

  $("#loginLink").text("");

})



//on home screen, if button on nav bar or to go to another page is clicked
$(".nav-link").on("click", function(event) {

  //determins id of button pressed
  buttonPressed = $(this).attr("name");

  //checks if logged in and acts according to function
  checkLogin(buttonPressed);

})



//when the Create Group button is clicked run add Group function and return to create group screen
$("#createGroupBtn").on("click", function(event) {
  event.preventDefault();
  addGroup();
  window.location = 'CreateGroup.html';
})



//submitting username and login to log in
$("#submitLogin").on("click", function(event) {

  event.preventDefault();

  username = $("#username").val().trim();
  password = $("#password").val().trim();

  // Clear localStorage
  sessionStorage.clear();

  // Store all content into localStorage
  sessionStorage.setItem("username", username);
  sessionStorage.setItem("password", password);

  //sets login status to true (not secure for real life but it works!)
  isLoggedIn = true;
  sessionStorage.setItem("isLoggedIn", isLoggedIn);

  //looks through all usernames stored in firebase
  database.ref().orderByChild("username").equalTo(username).once("value",snapshot => {
    const userData = snapshot.val();
    
    //if user already exists in firebase, do not save
    if (userData){

    }

    //if user does not already exist in firebase, save data to firebase
    else {
      database.ref().child("Users").child(username).set({
        username: username,
        password: password,
      });
    }

    //check if user is logged in
    checkLogin();

  });

})

//refreshes my groups list on load of page - this will display on My Groups table
refreshMyGroups()

