$(document).ready(function() {
	$('#calendar').fullCalendar({
		events: '/events'
	})

	var eventGetter = function(result) {
		result.forEach(function(element, index) {
			console.log(element.name);
			$('.fc-content').eq(index).append(element.name);
		})
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

