// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBK2Kr1D4B1Bdngxl90NOJEXokpAs4IKsk",
    authDomain: "firetrain-19e05.firebaseapp.com",
    databaseURL: "https://firetrain-19e05.firebaseio.com",
    projectId: "firetrain-19e05",
    storageBucket: "firetrain-19e05.appspot.com",
    messagingSenderId: "592894804955"
  };

  firebase.initializeApp(config);

  // firebase variable
  var database = firebase.database();

  // button for adding trains
  $('#add-train-btn').on('click', function (event) {
  	// so we don't reset the page each time we click
  	event.preventDefault();

  	// grab the user input
  	var trainName = $('#train-name-input').val().trim();
  	var trainDest = $('#destination-input').val().trim();
  	var trainTime = moment($('#first-train-input').val().trim(), "HH:mm").format("HH:mm a");
  	var trainFreq = moment($('#frequency-input').val().trim(), "mm").format("mm");

  	// creates local 'temporary' object for holding train data
  	var newTrain = {
  		name: trainName,
  		place: trainDest,
  		start: trainTime,
  		rate: trainFreq
  	};

  	// uploads train data to database

  	database.ref().push(newTrain);

  	// console.log baby | log it all to console
  	console.log(newTrain.name);
  	console.log(newTrain.place);
  	console.log(newTrain.start);
  	console.log(newTrain.rate);

  	// Alert alert
  	alert("Train successfully added!");

  	// clears all of the user input boxes
  	$('#train-name-input').val("");
  	$('#destination-input').val("");
  	$('#first-train-input').val("");
  	$('#frequency-input').val("");

  });

// firebase event for adding train to database and adding entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

	console.log(childSnapshot.val());

	// store everything into an variable
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().place;
	var trainTime = childSnapshot.val().start;
	var trainFreq = childSnapshot.val().rate;
	// variable for train away time
	// var trainAway = childSnapshot.val()

	// train info
	console.log(trainName);
	console.log(trainDest);
	console.log(trainTime);
	console.log(trainFreq);

	// make the train start pretty
	var trainTimePretty = moment.unix(trainTime).format('HH:mm');

	// var for time now
	var currentTime = moment().format('HH:mm');

	// next arrival calculation
	// var trainAway = currentTime.subtract(trainTime);
	var trainAway = moment.utc(moment(trainTime, 'HH:mm:ss').diff(moment(currentTime, 'HH:mm:ss'))).format('HH:mm');
	// var trainAway = moment().diff(moment.unix(trainTime, 'X'), 'mm');
	// var trainAway = currentTime.diff(trainTime).format('HH:mm');

	console.log(trainAway);

	// add each trains data into the table
	$('#train-table > tbody').append('<tr><td>' + trainName + '</td><td>' + trainDest + 
		'</td><td>' + trainFreq + '</td><td>' + trainTime + '</td><td>' + trainAway + '</td></tr>');

});



  // 	var empMonths = moment().diff(moment.unix(empStart, "X"), "months");






