var markerArray = [];

$(".panel-body").on('click','button',function(e){
	
	var $itineraryElement = $(this).siblings("select");
	var elementClass = $itineraryElement.attr('class');
	var $itemToAppend = "<div class='itinerary-item'><span class='title'>"+$itineraryElement.val()+"</span><button class='btn btn-xs btn-danger remove btn-circle'>x</button></div>";
	//console.log($itineraryElement.attr("class"));
	$("ul."+$itineraryElement.attr("class")).append($itemToAppend);
	//console.log(all_hotels)

	if(elementClass === "hotel"){
		var latLongArray = searchHelper(all_hotels,$itineraryElement)
	}
	else if(elementClass === "activity"){
		var latLongArray = searchHelper(all_activities,$itineraryElement);
	}
	else if(elementClass === "restaurant"){
		var latLongArray = searchHelper(all_restaurants,$itineraryElement);
  	 	
	}

	var latLong = {lat: latLongArray[0], lng: latLongArray[1]};
    var marker = new google.maps.Marker({position: latLong, map:map});
 //    if(!arraySearch(latLongArray,markerArray)){
	// 	var idx = markerArray.indexOf(latLongArray);
	// 	markerArray[idx] = null;
	// 	marker.setMap(null);	   
	// }else{
	// 	markerArray.push(latLongArray);
	// }
 console.log(markerArray)
})


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