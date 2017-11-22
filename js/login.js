$(function(){
	
	$(".uloginbtn").click(function(){
		var account = $("#loginAccount").val();
		var pwd = $("#loginPwd").val();
		var arr = getCookie("userlist");
		for(var i=0;i<arr.length;i++){
			if(arr[i].pid == account && arr[i].pwd == pwd){
				location.href = "index.html";
			}else{
				$(".errhead").show();
			}
		}
	})
	
	
	
})
