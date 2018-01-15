
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

  var buttonPressed;
  var newLink;
  var userID = 0;
  var userExists;

  $('#top-login-overlay, #top-login-modal span').click(function(){
    $('#top-login-overlay, #top-login-modal').hide();
  });

//when a home screen button is clicked
$(".btn-lg").on("click", function(event) {

  //determins id of button pressed
  buttonPressed = $(this).attr("id");
  checkLogin(buttonPressed);

})

//submitting username and login to log in
$("#submitLogin").on("click", function(event) {

  event.preventDefault();

  username = $("#username").val().trim();
  password = $("#password").val().trim();

  // Clear localStorage
  sessionStorage.clear();

  // Store all content into localStorage
  sessionStorage.setItem("usernamename", username);
  sessionStorage.setItem("password", password);

  //sets login status to true
  isLoggedIn = true;
  userID++;
  sessionStorage.setItem("isLoggedIn", isLoggedIn);

  database.ref().orderByChild("username").equalTo(username).once("value",snapshot => {
    const userData = snapshot.val();
    
    //if user already exists in firebase, do not save
    if (userData){

    }

    //if user does not already exist in firebase, save data to firebase
    else {
      console.log("does not exist");
      database.ref().push({
        userID: "user"+userID,
        username: username,
        password: password,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });
    }
    checkLogin();
  });

})


