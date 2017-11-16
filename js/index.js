$(function(){
	$("#nav_con .nav_ul li:first").mouseleave(function(){
		$("#nav_con .nav_ul li:first a").css({"color":"#b4a078"});
		$oI = $("<i class='xiaotiao'></i>").css({
		"width" : $(this).find("a").width(),
		"height" : "3px",
		"background" : "#b4a078",
		"position" : "absolute",
		"top" : "22px",
		"left" : $(this).find("a").position().left + 26
	});
	$(this).append($oI);
	})
	//背景轮播    
	$.ajax({
		type : "get",
		url : "../json/banner.json",
		success : function(res){
			$bannerArr = res;
		}
	});
		
	var bIndex = 0;
	$(".banner_con_img").eq(bIndex).css({"background":"url(../images/banner0.jpg)"});
	$("#banner .list li").eq(bIndex).addClass("active");
	
	var $timer = setInterval(function(){
		if(bIndex == 6){
			bIndex = -1;
		}
		autoPlay();
	},2000);
	
	function autoPlay(){
		bIndex++;
		$(".banner_con_tip").html($bannerArr[bIndex].tit);
		$("#banner .list li").eq(bIndex)
							 .addClass("active")
							 .siblings()
							 .removeClass("active");
		$(".banner_con_img").eq(bIndex)
							.css({"background":"url(../images/banner"+$bannerArr[bIndex].src+")"})
							.fadeIn(800)
							.siblings()
							.fadeOut(800);
	}
	
	//下标切换banner图
	$("#banner .list>li").mouseenter(function(){
		bIndex = $(this).index()-1;
		autoPlay();
	})
	
	
	//鼠标跟随
	$("#bg").hover(function(e){
		clearInterval($timer);
		var x = Math.min($(window).width()-$(".banner_con_tip").width(),Math.max(0,e.pageX));
		var y = Math.min(400,Math.max(0,e.pageY+20-$("#banner").offset().top));
		$(".banner_con_tip").show().css({"left":x,"top":y});
	},function(){
		$(".banner_con_tip").hide();
		$timer = setInterval(function(){
			if(bIndex == 6){
				bIndex = -1;
			}
			autoPlay();
		},2000);
	})
	
	
	//点击左右按钮切换
	$("#banner_con .leftBtn").click(function(){
		bIndex -= 2;
		if(bIndex < 0){
			bIndex = -1;
		}		
		autoPlay();
	})
	$("#banner_con .rightBtn").click(function(){
		clearInterval($timer);
		if(bIndex == 6){
			bIndex = 5;
		}
		autoPlay();
	})
	
	
	//制造商部分的放缩
	$("#pinpai .mask").hover(function(){
		$(this).parent().find(".ppImg").find("img").css("transform","scale(1.2)");
	},function(){
		$(this).parent().find(".ppImg").find("img").css("transform","scale(1)");
	})
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
})