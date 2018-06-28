
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



$("#submitButton").on("click", function (event) {
    event.preventDefault();
    console.log("hello");

    train = $("#train-name").val().trim();
    dest = $("#dest").val().trim();
    firstTrain = $("#firstTrain").val().trim();
    frequency = $("#frequency").val().trim();

    //dave values in database
    firebase.database().ref().set({
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

database.ref().on("value", function (snapshot) {

    // Print the data values to console to test the "listener"
    console.log(snapshot.val().train)
    console.log(snapshot.val().dest);
    console.log(snapshot.val().firstTrain);
    console.log(snapshot.val().frequency);

    let name = (snapshot.val().train)
    let freq = (snapshot.val().frequency);
    let destination = (snapshot.val().dest);



});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var empName = childSnapshot.val().name;
    var empRole = childSnapshot.val().role;
    var empStart = childSnapshot.val().start;
    var empRate = childSnapshot.val().rate;

    // Employee Info
    console.log(empName);
    console.log(empRole);
    console.log(empStart);
    console.log(empRate);

    // Prettify the employee start
    var empStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var empMonths = moment().diff(moment(empStart, "X"), "months");
    console.log(empMonths);

    // Calculate the total billed rate
    var empBilled = empMonths * empRate;
    console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(empName),
        $("<td>").text(empRole),
        $("<td>").text(empStartPretty),
        $("<td>").text(empMonths),
        $("<td>").text(empRate),
        $("<td>").text(empBilled)
    );

    // Append the new row to the table
    $("#employee-table > tbody").append(newRow);
});







//Example of a listener in Firebase and code for counters
/* var count = 100;

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
});  */