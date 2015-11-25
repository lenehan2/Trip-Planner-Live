$(".panel-body").on('click','button',function(e){
	console.dir($(this).siblings("select").val())
})