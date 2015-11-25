var markerArray = [];
var map = initialize_gmaps();


$("#places-selector").on('click','button',function(e){
	var $select = $(this).siblings('select');
	var $list = $('<li></li>');
	var $div = $("<div class='itinerary-item'></div>");
	var $span = $("<span class='title'>"+$select.val()+"</span>")
	var $xbutton = $("<button class='btn btn-xs btn-danger remove btn-circle'>x</button>");
	
	var elementToAdd = $list.append($div);
	$div.append($span);
	$div.append($xbutton);
	$select.append($list);
	var elementClass = $select.attr('class');
	
	$(".itinerary-active ul."+$select.attr("class")).append(elementToAdd);

	if(elementClass === "hotel"){
		var latLongArray = searchHelper(all_hotels,$select);
	}
	else if(elementClass === "activity"){
		var latLongArray = searchHelper(all_activities,$select);
	}
	else if(elementClass === "restaurant"){
		var latLongArray = searchHelper(all_restaurants,$select);
	}
	var latLong = {lat: latLongArray[0], lng: latLongArray[1]};
	
	var markerinstance = drawLocation(latLongArray);
	
	$xbutton.on('click', function(){
		var $this = $(this);
		markerinstance.setMap(null);
		$this.closest('li').remove();
	});
  console.log(markerArray)
});



$('.day-buttons').delegate('button', 'click', selectDayBtn);
$('#add-day').on('click', function(){
	var $this = $(this);
	var divToAppend = $this.parent();
	var dayNum = divToAppend.children().length;
	var $button = $('<button class="btn btn-circle day-btn day-number">'+dayNum+'</button>');
	var $dayItinerary = $('#itinerary0').clone(true);
	$('#itinerary-panel').append($dayItinerary);

	$dayItinerary.attr('id',"itinerary"+dayNum);
	$button.on('click', selectDayBtn);
	$this.before($button);
})
function selectDayBtn(){
	var $this = $(this);
	if($this.hasClass('day-number')){
		$this.siblings().removeClass('current-day');
		$this.addClass('current-day');
		
		var dayNum = $this.text();
		$('#day-display').text('Day ' + dayNum);
		$('.itinerary').removeClass('itinerary-active').hide();
		$('#itinerary'+dayNum).addClass('itinerary-active').show();
	}
}


var searchHelper = function(list,element){
 	return list.filter(function(el){
   		return el.name === element.val();
   	})[0].place[0].location;
 };



 // var arraySearch = function(element,array){
 // 	for(var i = 0; i <array.length; i++){
 // 		if(array[i][0]===element[0] && array[i][1]=== element[1]){
 // 			return false;
 // 		}
 // 	}
 // 	return true;
 // }