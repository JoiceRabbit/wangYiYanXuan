//top--客户服务
$("#kefuLi").hover(function(){
	$(".kefu_erji").show();
	$(this).find("i").removeClass("iconfont icon-jiantoushang").addClass("iconfont icon-jiantouxia");
},function(){
	$(".kefu_erji").hide();
	$(this).find("i").removeClass("iconfont icon-jiantouxia").addClass("iconfont icon-jiantoushang");
});

//top--APP下载
$(".top_nav_last").hover(function(){
	$(this).find("img").show();
},function(){
	$(this).find("img").hide();
});


//搜索框热搜
$(".logo_right input").focus(function(){
	$(this).val("");
	if(historyArr.length > 0){
		$str = "<i class='iconfont icon-chuyidong'></i>";
		$("li.history").html(historyArr[historyArr.length-1] + $str);
	}
	$(".hot li:lt(2)").css("color","#b4282d");
	$(".logo_right_history").show().hover(function(){
		$(this).find("li").hover(function(){       //鼠标移入每个记录，改变背景色
			$(this).css("background","#F3F3F3");
		},function(){
			$(this).css("background","");
		})
	},function(){
		$(".logo_right_history").hide();
	});
	
})
var	historyArr = [];   //历史记录         //历史记录不能存在数组中，，否则点击搜索再回到首页时会刷新页面，，数组又清空了
$(".logo_sousuo .icon-sousuo").click(function(){
	historyArr = [$(".logo_right input").val()];
	$(".logo_right_history").hide();
	
})

//删除历史记录
$(".logo_Right_delBtn").click(function(){
	historyArr.length = 0;
	$(".history").html("");
})
//历史记录上的X删除
if(historyArr.length > 0){
	$(".icon-chuyidong").click(function(){
		$(".history").html("");
		historyArr.length = 0;
	})
}



//导航条的二级导航的显示隐藏
$("#nav_con .nav_ul>li").hover(function(){
	//给二级菜单加一个白色的背景div,,宽度同屏幕
	var _top = 0
	if($("#nav").css("position") == "fixed"){
		_top =  $("#nav").outerHeight();
	}else{
		_top = $("#nav").offset().top + $("#nav").outerHeight();
	}
	$(".nav_bg").css({
		"height":$(this).find("ul").height(),
		"width" : "100%",
		"background" : "#fff",
		"left" : 0,
		"top" : _top
	}).show();
	
	$(this).find("ul").css("z-index","10").show(); 
	//鼠标移入一级菜单下面出现的小条
	$oI = $("<i class='xiaotiao'></i>").css({
		"width" : $(this).find("a").width(),
		"height" : "3px",
		"background" : "#b4a078",
		"position" : "absolute",
		"top" : "22px",
		"left" : $(this).find("a").position().left + 26
	});
	$(this).append($oI);
	
},function(){
	$(".nav_bg").hide();
	$(".xiaotiao").hide();
	$(this).find("ul").hide(); 	
})

$(".nav_ul>li:eq(11)>a").css("border-left","1px solid #cccccc");

$("#nav_con a,#nav_con span").hover(function(){
	$(this).css({"color":"#b4a078"});
},function(){
	$(this).css({"color":"#000"});
})


//侧边栏
$("#besideR>div").hover(function(){
	$(this).find("span").css("color","#b4a078");
	$(this).find("i").css("color","#b4a078");
},function(){
	$(this).find("span").css("color","#666");
	$(this).find("i").css("color","#666");
})

//显示隐藏二维码
$("div.app").hover(function(){
	$(this).find("img").show();
},function(){
	$(this).find("img").hide();
})

//回到顶部
$(window).scroll(function(){
	//获取页面滚走的距离
	var sTop = $(document).scrollTop();
	var cHeight = $(window).height();

	
	//回到顶部的显示和隐藏
	if(sTop > cHeight){
		$(".backTop").show();
		$(".backTop").click(function(){
			$(document).scrollTop() = 0;
		})
	}else{
		$(".backTop").hide();
	}
	
	//导航吸顶
	
	if(sTop >250){
		$("#nav").css({"position":"fixed","top":0})
	}else{
		$("#nav").css("position","");	
	}
	
	/*//侧边栏定位
	$("#besideR").animate({"top":sTop+150},80);*/
	
});


