
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

//sets users initial logged in status based on session storage
var isLoggedIn = false;

/*if (sessionStorage.getItem(isLoggedIn) == null) {
  isLoggedIn = false;
}
isLoggedIn = sessionStorage.getItem("isLoggedIn");

if (isLoggedIn == "false") {
  isLoggedIn = false;
}

if (isLoggedIn == "true") {
  isLoggedIn = true;
}*/

//initializing variables
var buttonPressed;
var newLink;
var userExists;
var groupName;
var groupTheme;
var groupParticipants;
var groupDate;


//function to check if user is logged in already
function checkLogin(path) {
  if(path) {
    if (isLoggedIn) {
      window.location = path +'.html';
    } else {
      //window.location.href("Lunch.html")
      $('#loginScreen').show();
    }
  } else {
    if(isLoggedIn) {
      window.location = "Lunch.html";
    }
  }
}

function addGroup() {
  
  groupName = $("#groupName").val().trim();
  groupParticipants = $("#groupParticipants").val().trim();
  groupTheme = $("#groupTheme").val().trim();
  console.log(groupParticipants);
  console.log(groupTheme);
  var username = sessionStorage.getItem("username", username);

  today = new Date();
  groupDate = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

  database.ref().child("Users").child(username).child("MyGroups").push({
    groupName: groupName,
    groupDate: groupDate,
    groupParticipants: groupParticipants,
    groupTheme: groupTheme
  });
  
  database.ref().orderByChild("username").equalTo(username).once("value",snapshot => {
    const userData = snapshot.val().child("Users").child(username).child("MyGroups");
    console.log(userData)
  })

  console.log(userData);

}

//when a home screen button is clicked
$(".btn-lg").on("click", function(event) {

  //determins id of button pressed
  buttonPressed = $(this).attr("id");

  //checks if logged in
  checkLogin(buttonPressed);

})

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

  //sets login status to true
  isLoggedIn = true;
  sessionStorage.setItem("isLoggedIn", isLoggedIn);

  database.ref().orderByChild("username").equalTo(username).once("value",snapshot => {
    const userData = snapshot.val();
    
    //if user already exists in firebase, do not save
    if (userData){

    }

    //if user does not already exist in firebase, save data to firebase
    else {
      console.log("does not exist");
      database.ref().child("Users").child(username).set({
        username: username,
        password: password,
      });
    }

    //check if user is logged in
    checkLogin();

  });

})


