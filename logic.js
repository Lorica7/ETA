
// Initialize Firebase

var config = {
    apiKey: "AIzaSyCqtEwFWwVVdd5teCAI_htzh3MaxS2oxSw",
    authDomain: "trainscheduleapp-da14d.firebaseapp.com",
    databaseURL: "https://trainscheduleapp-da14d.firebaseio.com",
    projectId: "trainscheduleapp-da14d",
    storageBucket: "trainscheduleapp-da14d.appspot.com",
    messagingSenderId: "752893953291"
};
firebase.initializeApp(config);

//Create variables

var train = "";
var destination = "";
var firstTrain = "";
var frequency = 0;

$("#submitButton").on('click', function () {
    console.log(hello);
    train = $("#train-name").val().trim();
    destination = $("#destination").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();

firebase.database().ref().set({
    train: train,
    destination: destination,
    firstTrain : firstTrain,
    frequency: frequency,
});
});




//Example of a listener in Firebase and code for counters
var count = 100;

firebase.database().ref().on('value', function (snapshot) {
    snapshot.log(snapshot.val());
    count = snapshot.val().clicks;
    $("#click-value").html(count);
});

$("#clickButton").on('click', function () {
    count--;
    firebase.database().ref().set({
        clicks: count
    });

});
$("#restartButton").on('click', function () {
    firebase.database.ref().set({
        clicks: 100,
    });
});