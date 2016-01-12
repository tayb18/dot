$(document).ready(function() {
	
  var modal = $(".modal-container");
  var closeModal = $("close-button");
  $('#calendar').on('click', '.fc-content' ,function(event){
      console.log('clicky')
      console.log(event.target)
      console.log(event.currentTarget);

      modal.toggle();
  })
  $('.close-button').on('click', function(event){
    modal.toggle();
  })

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
