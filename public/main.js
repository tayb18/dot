$(document).ready(function() {
	$('#calendar').fullCalendar({
		events: '/events'
	})

	var eventGetter = function(result) {
		console.log(result);
	}
	var aJax = function() {
		$.ajax({
			url: "/events", 
			type: "GET",
			dataype: "JSON"
		}).done(eventGetter);
	};


	
	aJax();

});

