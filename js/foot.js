$(".fUsList>div").hover(function(){
	$(this).children().eq(1).show();
},function(){
	$(this).children().eq(1).hide();
})
