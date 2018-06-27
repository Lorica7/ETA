
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDTJUjqxwpbotfVejqlK6HdJJAFGqlS-4g",
    authDomain: "click-counter-83957.firebaseapp.com",
    databaseURL: "https://click-counter-83957.firebaseio.com",
    projectId: "click-counter-83957",
    storageBucket: "",
    messagingSenderId: "368830660281"
  };
  firebase.initializeApp(config);


//Example of a listener in Firebase
var count = 100;

firebase.database().ref().on('value', function(snapshot){
    snapshot.log(snapshot.val());
    count = snapshot.val().clicks;
    $("#click-value").html(count);
});

$("#clickButton").on('click', function(){
    count--;
    firebase.database().ref().set({
        clicks: count
    });

});
$("#restartButton").on('click', function(){
    firebase.database.ref().set({
        clicks: 100,
    });
});