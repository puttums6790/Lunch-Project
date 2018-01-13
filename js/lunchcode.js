
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

  var database = firebase.database

  $('#trigger-top-login-modal').click(function(){
    $('#top-login-overlay, #top-login-modal').show();
  });

  $('#top-login-overlay, #top-login-modal span').click(function(){
    $('#top-login-overlay, #top-login-modal').hide();
  });
