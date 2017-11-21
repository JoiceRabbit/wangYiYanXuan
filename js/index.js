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

	
	//品牌制造商部分的放缩
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
	
	
	//人气推荐部分  ajax实现选项卡
	$.ajax({
		type:"get",
		url:"../json/recommend.json",
		async:true,
		success:function(res){
			var json = res;    //json形式存储的数据      不同选项卡对应的数据对应一个数组
			var type = "";
			var str = "";
			
			autoPlay2("bianji");
			$(".re_bottom").html(str);
			
			//选项卡
			$(".re_header_menu .item").click(function(){
				if($(this).index()){
					type = "rexiao";
				}else{
					type = "bianji";
				}
				$(this).addClass("tab-sel").siblings().removeClass("tab-sel");
				autoPlay2(type);
				$(".re_bottom").html(str);
			})
			
			//人气推荐部分的鼠标移入放缩
			$(".re_bottom").on({
				"mouseenter" : function(){
					$(this).find("img").css("transform","scale(1.1)");
				},
				"mouseleave" : function(){
					$(this).find("img").css("transform","scale(1)");
				}
			}
			,".re_pro");
			
			//点击跳转详情页  product.html
			$(".re_bottom").on("click",".re_pro",function(){
				var id = $(this).find(".data").data("id");
				var pname = $(this).find(".data").data("name");
				var psort = $(this).find(".data").data("sort");
				location.href = `product.html?pid=${id}&pname=${pname}&psort=${psort}`;
			})
			
			function autoPlay2(type){
				str = "";
				var arr = json[type];
				for(var i=0;i<arr.length;i++){
					var product = arr[i];
					if(i<4){
						str += `<div class="re_pro popular m-popular">
									<div class="re_box_top">
										<a href="javascript:;" alt="${product.name}">
											<div style="width: 100%;height: 100%;">
												<img src="../images/recommend/${product.src}" alt="${product.name}" title="${product.name}"/>
											</div>
										</a>
									</div>
									<div class="re_box_bottom">
										<div class="newPro_tags"></div>
										<h4 class="newPro_name">
											<a href="#" title="${product.name}">${product.name}</a>
										</h4>
										<span class="newPro_price">${product.price}</span>
									</div>
									<span class="data" style="display:none" data-id =${product.id} data-name = ${product.name} data-sort = ${type}></span>
								</div>`;
					}else{
						str += `<div class="re_pro popular m-popular down">
									<div class="re_box_top">
										<a href="javascript:;" alt="${product.name}">
											<div style="width: 100%;height: 100%;">
												<img src="../images/recommend/${product.src}" alt="${product.name}" title="${product.name}"/>
											</div>
										</a>
									</div>
									<div class="re_box_bottom">
										<div class="newPro_tags"></div>
										<h4 class="newPro_name">
											<a href="#" title="${product.name}">${product.name}</a>
										</h4>
										<span class="newPro_retailPrice">${product.price}</span>
									</div>
									<span class="data" style="display:none" data-id =${product.id} data-name = ${product.name} data-sort = ${type}></span>
								</div>`;
					}
				}
			}
		}
	});
	
	
	//限时购倒计时
	var d = new Date().toLocaleDateString();
	var end = new Date(d + " 22:00:00");
	var start = new Date();
	var t = (Date.parse(end) - Date.parse(start))/1000;
	showTime();
	
	var timer1 = setInterval(function(){
		t--;
		if(t<=0){
			$(".j-hour").html("00");
			$(".j-minute").html("00");
			$(".j-second").html("00");
			clearInterval(timer1);
		}else{
			showTime();
		}
	},1000)
	
	function showTime(){
		//剩余的小时数
		var h = parseInt(t/3600);
		//剩余的分钟数
		var m = parseInt((t - h*3600)/60);
		//剩余的分钟数
		var s = parseInt(t - h*3600 - m*60);
		
		$(".j-hour").html(h);
		$(".j-minute").html(m);
		$(".j-second").html(s);
	}
	
	
	
	//类别
	$.ajax({
		type:"get",
		url:"../json/indexCates.json",
		async:true,
		success : function(res){
			var str = "";
			var json = res;
			for(var attr in json){
				str = "";
				for(var i=1;i<json[attr].length;i++){
					var product = json[attr][i];
					str += `<li class="item">
								<div class="newPro_pro">        
									<div class="newPro_hd hd">
										<a href="#" title="${product.name}" > 
											<div class="newPro_first">
												<img src="../images/${product.src}" alt="#" class="picItem"/>
											</div>
										</a>
									</div>
									<div class="newPro_bd">
										<div class="newPro_tags"></div>
										<h4 class="newPro_name">
											<a href="#" title="${product.name}">${product.name}</a>
										</h4>
										<p class="newPro_price">
											<span class="newPro_retailPrice indexPrice">${product.price}</span>
										</p>
									</div>
								</div>
							</li>`;
				}
				if(attr == "jujia"){
					$(".jujia .bd .itemList").html(str);
					$(".jujia .banner a div").html(`<img src="../images/${json[attr][0].src}" alt="#" />`);
				}
				if(attr == "kitchen"){
					$(".kitchen .bd .itemList").html(str);
					$(".kitchen .banner a div").html(`<img src="../images/${json[attr][0].src}" alt="#" />`);
				}
			}
			
			//分类展示部分的放缩
			$("#indexCates .bd .item").hover(function(){
				$(this).find("img").css("transform","scale(1.1)");
			},function(){
				$(this).find("img").css("transform","scale(1)");
			})
		}
	})
});	
	
	
	
	
	
	
	
	
