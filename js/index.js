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
	
	
	//banner点击左右按钮切换
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
		$(this).parent().find(".ppImg").find("img").css("transform","scale(1.1)");
	},function(){
		$(this).parent().find(".ppImg").find("img").css("transform","scale(1)");
	})
	

	//新品首发--手动轮播
	$.ajax({
		type:"get",
		url:"../json/newProduct.json",
		async:true,
		success : function(res){
			var arr = res;
			var index = 0;
			newPro_content();
			
			//点击向右按钮
			$(".newPro_btnR").click(function(){
				index++;
				if(index == 8){
					index = 7;
				}
				newPro_content();
			})
			
			//点击向左按钮
			$(".newPro_btnL").click(function(){
				index--;
				if(index == -1){
					index = 0;
				}
				newPro_content();
			})
			//动态创建页面结构
			function newPro_content(){
				var str = "";					
				for(var i=0;i<4;i++){
					var product = arr[index*4+i];     //表示一个商品，json形式
					str += `<div class="newPro_pro">        
							<div class="newPro_hd">
								<a href="#" title="${product.name}" > 
									<div class="newPro_first">
										<img src="../images/newProduct/${product.src}" alt="${product.name}" />
									</div>
									<div class="newPro_second">
										<img src="../images/newProduct/${product.src1}" alt="${product.name}"/>
									</div>
								</a>
							</div>
							<div class="newPro_bd">
								<div class="newPro_tags">
								</div>
								<h4 class="newPro_name">
									<a href="#" title="${product.name}">${product.name}</a>
								</h4>
								<p class="newPro_price">
									<span class="newPro_retailPrice">${product.price}</span>
								</p>
								<div class="newPro_bd_bg"></div>
							</div>
					</div>`;
				}
				$(".newPro_products").html(str);
				
				//有bug
				for(var i=0;i<4;i++){
					var product = arr[index*4+i];
					var hot = `<span class="newPro_hot">${product.hot}</span>`;
					var benefit = `<span class="newPro_benefit">${product.benefit}</span>`;
					var manufacturer = `<span class="newPro_manufac"><a href="#">${product.manufacturer}</a></span>`;
					var colorNum = `<div class="colorNum">${product.colorNum}色可选</div>`;
					if(product.hot != undefined){
						$("#newPro .newPro_tags").append(hot);
					}
					if(product.benefit != undefined){
						$("#newPro .newPro_tags").append(benefit);
					}
					if(product.colorNum != undefined){
						$("#newPro .newPro_hd a").append(colorNum);
					}
					if(product.manufacturer != undefined){
						$("#newPro .newPro_bd").append(manufacturer);
					}
				}
			}
			
			//鼠标移入切换图片
			$(".newPro_list_box").delegate(".newPro_pro",{
				"mouseenter":function(){
					$(this).find(".newPro_first").hide();
					$(this).find(".newPro_second").show();
					$(this).find(".newPro_bd_bg").show();
					$(this).css("box-shadow","0.5px 0.5px 1px 1px #ccc");
				},
				"mouseleave" : function(){
					$(this).find(".newPro_first").show();
					$(this).find(".newPro_second").hide();
					$(this).find(".newPro_bd_bg").hide();
					$(this).css("box-shadow","");
				}
			})
		}
	});

	
	/*<span class="newPro_manufac"><a href="#">Adidas制造商</a></span> 
	<span class="newPro_hot">爆品</span> 
	<span class="newPro_benefit">加价购</span>
	<div class="colorNum"></div> */
	
});	
	
	
	
	
	
	
	
	
