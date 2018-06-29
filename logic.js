
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
var database = firebase.database();
var train = "";
var dest = "";
var firstTrain = "";
var frequency = 0;

//Event listener on Submit button
$("#submitButton").on("click", function (event) {
    event.preventDefault();
    console.log("hello");

    train = $("#train-name").val().trim();
    dest = $("#dest").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();

    //dave values in database
    firebase.database().ref().push({
        train: train,
        dest: dest,
        firstTrain: firstTrain,
        frequency: frequency,
    });
    $("#train-name").val("");
    $("#dest").val("");
    $("#first-Train").val("");
    $("#frequency").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    // Store everything into a variable.
    var trName = childSnapshot.val().train;
    var trDest = childSnapshot.val().dest;
    var trFirstTrain = childSnapshot.val().firstTrain;
    var trFreq = childSnapshot.val().frequency;
    let trNext = "";
    let trMins = "";
    // Time calculations //

    var tFrequency = trFreq;
    var firstTime = trFirstTrain;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    trNext = moment(nextTrain).format("hh:mm");

    //Time Calculations end
    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trName),
        $("<td>").text(trDest),
        $("<td>").text(trFreq),
        $("<td>").text(trNext),
        $("<td>").text(tMinutesTillTrain),
    );
    // Append the new row to the table
    $("#train-times > tbody").append(newRow);
});