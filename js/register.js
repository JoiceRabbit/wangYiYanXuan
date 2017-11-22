$(function(){
	//账号验证（缺少存在验证）
	var flagAccount = null;
	$("#inpt-account").blur(function(){
		account = $(this).val();
		var reg = /(^1[358]\d{9}$)|(^[a-zA-Z]\w{5,17}@\w+.com$)/;   //网易邮箱、手机号、其他邮箱
		var exist = "";
		var brr = getCookie("userlist");
		for(var i=0;i<brr.length;i++){
			if(brr[i].pid == account){
				exist = true;
			}
		}
		
		if(exist){
			flagAccount = false;
			$(this).parent().find(".popb").html("此账户已存在").show();
		}else if(reg.test(account)){
			flagAccount = true;
			$(this).parent().find(".popb").html("正确").show();
		}else{
			flagAccount = false;
			$(this).parent().find(".popb").html("不合法").show();
		}
		return flagAccount;
	})
	
	//验证密码
	var flagPwd = "";
	$("#inpt-pw").blur(function(){
		pw = $(this).val();
		var reg = /^\w{6,16}$/;    //6-16位密码字母数字下划线，区分大小写
		if(reg.test(pw)){
			flagPwd = true;
			$(this).parent().find(".popb").html("正确").show();
		}else{
			flagPwd = false;
			$(this).parent().find(".popb").html("不合法").show();
		}
		return flagPwd;
	})
	
	
	//确认密码
	var flagRePw = "";
	$("#inpt-pw2").blur(function(){
		pw = $("#inpt-pw").val();
		if($(this).val() == pw){
			flagRePw = true;
			$(this).parent().find(".popb").html("正确").show();
		}else{
			flagRePw = false;
			$(this).parent().find(".popb").html("密码不一致").show();
		}
		return flagRePw;
	})
	
	
	//验证码
	var flagCode = "";
	var str = "0123456789";
	var code = "";
	$("#inpt-code").focus(function(){
		code = "";
		for(var i=0;i<4;i++){
			code += str.charAt(parseInt(Math.random()*10));
		}
		$(".ncpt_pad").show().children().html(code);
	})
	$("#inpt-code").blur(function(){
		codeVal = $(this).val();
		$(".ncpt_pad").hide();
		if(codeVal == code){
			flagCode = true;
			$(this).parent().find(".popb").html("正确").show();
		}else{
			flagCode = false;
			$(this).parent().find(".popb").html("不正确").show();
		}
		return flagCode;
	})
	
	//验证手机号
	var flagPhone = "";
	$("#inpt-phone").blur(function(){
		phone = $(this).val();
		var reg = /^1[358]\d{9}$/;
		if(reg.test(phone)){
			flagPhone = true;
			$(this).parent().find(".popb").html("正确").show();
		}else{
			flagPhone = false;
			$(this).parent().find(".popb").html("不正确").show();
		}
		return flagPhone;
	})
	
	
	
	check();
	//提交验证
	function check(){
		$("#register").click(function(){
			var flag = flagAccount && flagCode && flagPhone && flagPwd && flagRePw;
			//console.log(flag);
			if(flag){
				location.href = "login.html";
				//将账户写入cookie
				var json = {
					"pid" : account,
					"pwd" : pw,
					"phone" : phone
				}
				var arr = getCookie("userlist");
				arr.push(json);
				//console.log(arr);
				setCookie("userlist",JSON.stringify(arr),5);
			}
			
		})
	}
})
