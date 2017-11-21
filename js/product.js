$(function(){
	//ajax请求显示商品
	show();
	//大家都在看
	allSee();
	
	
	
	
	//、、、、、、、、、、、、、、、、、、、、、、、、、、、、功能封装、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、、
	
 		
	//ajax请求显示商品
	function show(){
		$.ajax({
			type:"get",
			url:"../json/product.json",
			async:true,
			success:function(json){
				
				//如果路径没有参数   ？   就说明没有传递数据
				//http://127.0.0.1:8020/wangYiYanXuan/html/product.html?pid=06&pname=%E5%85%A8&psort=bianji
				var urlMess = location.href;
				if( urlMess.indexOf( "?" ) == -1){
					return;
				}
				urlMess = urlMess.split("?")[1];//"pid=shop01&cname=classify001"
				var arr = urlMess.split("&");//["pid=shop01","cname=classify001"]
				var pid = arr[0].split("=")[1];
				pname = arr[1].split("=")[1];  //有ID和sort分类可以不要name
				psort = arr[2].split("=")[1];
				
				
				var str = "";
				var jsonIndex = 0;  //每个商品在其分类下的下标
				for(var i=0;i<json[psort].length;i++){
					var product = json[psort][i];
					if(pid == product.id){
						jsonIndex = i;
						str = `<div class="detailHd">
									<div class="hd_left">
										<div class="view">
											<img src="../images/product/${product.src1}" alt="保暖嫩肤蚕丝羽绒子母被" />
										</div>
										<div class="list">
											<ul>
												<li class="z_active ">
													<a href="javascript:;">
														<img src="../images/product/${product.src01}" alt="#" />
													</a>
												</li>
												<li>
													<a href="javascript:;">
														<img src="../images/product/${product.src02}" alt="#" />
													</a>
												</li>
												<li>
													<a href="javascript:;">
														<img src="../images/product/${product.src03}" alt="#" />
													</a>
												</li>
												<li>
													<a href="javascript:;">
														<img src="../images/product/${product.src04}" alt="#" />
													</a>
												</li>
												<li>
													<a href="javascript:;">
														<img src="../images/product/${product.src05}" alt="#" />
													</a>
												</li>
											</ul>
										</div>
									</div>
									<div class="hd_right">
										<div class="intro">
											<div class="name">${product.name}</div>
											<div class="detailTag">
												<a href="javascript:;" class="manufacTag">罗莱制造商</a>
												<a href="javascript:;" class="hotTag">爆品</a>
											</div>
											<div class="desc">95%白鹅绒+双宫茧桑蚕丝，保暖保湿双合一</div>
										</div>
										<noscript></noscript>
										<div class="price">
											<a href="javascript:;">
												<div class="comment">
													<span class="f-fz18">155</span>
													<br />
													<span class="f-fz13">用户评价</span>
												</div>
											</a>
											<div class="field pBox f-cb">
												<span class="label label-1">售价</span>
												<span class="rp">
													<span class="num">${product.price}</span>
												</span>
												<span></span>
											</div>
											<div class="field getCoupon">
												<span class="label label-2">领券</span>
												<div>
													<ul class="coupons">
														<li class="coupon">
															<span>每满100减20券</span>
														</li>
														<li>
															<a href="javascript:;" class="couponOffHand f-left">
																<span>立即领取></span>
															</a>
														</li>
													</ul>
												</div>
											</div>
											<div class="field sale j-sale">
												<span class="label label-2">促销</span>
												<div class="saleLine">
													<a href="javascript:;" class="link">
														<div class="activityType">感恩节</div>
														<span>券后直减380元，限时仅1619元</span>
													</a>
													<div style="clear: both;"></div>
												</div>
												<div style="clear: both;"></div>
											</div>
											<div>
												<div class="field pointInfo">
													<span class="label">积分</span>
													<span class="pointCt">
														<span>购买最高得</span>
														<span>199</span>
														<span>积分</span>
													</span>
												</div>
											</div>
											<div class="field server">
												<span class="label">服务</span>
												<div class="policyBox">
													<div class="sItem j-policyPop">
														<span>·&nbsp;</span>
														<span>30天无忧退换货</span>
														<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
													</div>
													<div class="sItem j-policyPop">
														<span>·&nbsp;</span>
														<span>网易自营品牌</span>
														<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
													</div>
													<div class="sItem j-policyPop">
														<span>·&nbsp;</span>
														<span>48小时快速退款</span>
														<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
													</div>
													<div class="sItem j-policyPop slast">
														<span>·&nbsp;</span>
														<span>满88元免邮费</span>
														<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
													</div>
												</div>
											</div>
											<form action="#" method="post" id="j-directBuySubmitForm"></form>
										</div>
										<div>
											<div class="m-parampicker" style="margin-top: 20px;">
												<div class="specProp">
													<span class="type type-1">尺寸</span>
													<div class="cont">
														<ul class="tabs">
															<li class="tab_con">
																<a href="javascript:;" class="tab tab_txt">
																	<span class="txt">220*240cm（蚕丝570g+羽绒1370g）</span>
																</a>
															</li>
															<li class="tab_con">
																<a href="javascript:;" class="tab tab_txt">
																	<span class="txt">200*230cm（蚕丝500g+羽绒1100g）</span>
																</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
											<div class="number u-formctr">
												<div class="name name-1">数量</div>
												<div class="field">
													<div class="u-selnum">
														<span class="less z-dis">-</span>
														<input type="text" value="1" class="dis" disabled/>
														<span class="more z-dis">+</span>
													</div>
												</div>
											</div>
										</div>
										<div class="btns">
											<a href="javascript:;" class="btn w-button w-button-xl w-button-ghost">
												<span>
													<span>立即购买</span>
												</span>
											</a>
											<a href="javascript:;" class="btn w-button w-button-xl w-button-primary">
												<span>
													<i class="iconfont icon-caigou-xianxing cart-detail"></i>
													<span>加入购物车</span>
												</span>
											</a>
											<div class="w-collectZone" title="点击收藏">
												<div class="top">
													<span class="iconfont icon-Storagebox shoucang"></span>
												</div>
												<div class="bottom">
													<p>收藏</p>
												</div>
											</div>
										</div>
										<span></span>
									</div>`;
						break;
					}
				}
				
				$("#main_con .detail").html(str);
				
				//切换商品细节图
				proImgs(json,jsonIndex);
				//选择商品尺寸和数量
				choose();
			}
		});
	}
	
	//切换商品细节图
	function proImgs(json,jsonIndex){
		$(".list").on("mouseenter","li",function(){
			var pro = json[psort][jsonIndex];   //每个商品
			var index = $(this).index();
			var src = "src" + (index+1);
			$(".view img").attr("src","../images/product/"+pro[src]);
			$(this).addClass("z_active").siblings().removeClass("z_active");
		})
	}
	
	//选择商品尺寸和数量
	function choose(){
		$(".tabs .tab_con").on("click","a",function(){
			$(this).addClass("tab_sel").parent().siblings().find("a").removeClass("tab_sel");
			$(".u-selnum input").removeAttr("disabled");
			$(".u-selnum span").eq(1).css("cursor","pointer");
			if($(".u-selnum input").val() > 1){
				$(".u-selnum span").eq(0).css("cursor","pointer");
			}
		})
	}
	
	
	//大家都在看部分
	function allSee(){
		//按钮变化
		$(".recommend-wrap span").mouseenter(function(){
			_left = $(".slick-track").position().left;
			if(_left == 0 && $(this).index() == 2){
				$(this).css("background","#A94528");
			}
			if(_left != 0 && $(this).index() == 1){
				$(this).css("background","#A94528");
			}
		});
		$(".recommend-wrap span").mouseleave(function(){
			$(this).css("background","#E7E2D7");
		})
		
		//手动轮播
		$(".rec-rightBtn").click(function(){
			if(_left == 0){
				$(".slick-track").animate({"left":-960},500);
			}
		})
		$(".rec-leftBtn").click(function(){
			if(_left != 0){
				$(".slick-track").animate({"left":0},500);
			}
		})
		
		//放缩
		$(".recommend-list li").on({
			"mouseenter" : function(){
				$(this).find("img").css("transform","scale(1.1)");
			},
			"mouseleave" : function(){
				$(this).find("img").css("transform","scale(1)");
			}
		});
	}	
})
