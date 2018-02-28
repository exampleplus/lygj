				//判断变量是否为空
				function checkVar(param){
					if(param=='' || param==undefined || param==null){
						return false;
					}
					return true;
				}
				var timestamp = (new Date()).valueOf();
				var hide=$("#hide");
				var imgCap=$("#imgCap");
				hide.val(timestamp);
				imgCap.attr("src","http://api.zhuliqianbao.com/lygj/captcha.svl?RCaptchaKey="+timestamp);
			function createCode(){
				var timestamp2 = (new Date()).valueOf();
				imgCap.attr("src","http://api.zhuliqianbao.com/lygj/captcha.svl?RCaptchaKey="+timestamp2);
				hide.val(timestamp2);
			}
			//点击发送验证码
			var sendcode=$('#sendcode');
			sendcode.click(function(){
				var phonePattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^(([0\+]\d{2,3})?(0\d{2,3}))(\d{7,8})((\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
				var phoneNum=$('#user_tel').val();//手机号
		        var pwd=$('#pwd').val()//密码
		        var code=$('#code').val()//手机验证码
		        var inputCode=$("#inputCode").val()//图形验证码
		        var cont=$("#cont");
				var times=60;
				var timer=null;
				var val=$("#hide").val();
				var url1="http://api.zhuliqianbao.com/lygj/guanjia_api/act/light-loan-lyb/registerCode2/"+phoneNum+"/"+inputCode+"?RCaptchaKey="+val;
				 if(!checkVar(phoneNum)){
				 	cont.text('*请输入手机号').show().delay(2000).fadeOut();
				 	return;
				 }else if(phonePattern.test(phoneNum) == false){
				 	cont.text('*请输入正确的手机格式').show().delay(2000).fadeOut();
				 	return;
				 }else if(!checkVar(inputCode)){
				 		cont.text('*请输入图形验证码').show().delay(2000).fadeOut();
				 		return;
				 }
				timer=setInterval(function(){
					times--;
					sendcode.attr("disabled","true");
					sendcode.val(times + "秒后重试");
					sendcode.css('background',"#ccc");
					if(times==0){
				          sendcode.removeAttr("disabled");
				          sendcode.val("发送验证码");
				          sendcode.css('background',"rgb(255,158,0)");
				          clearInterval(timer);
				          times = 60;
				        }
				},1000)
				$.ajax({
					  	type:"get",
					  	url:url1,
					  	dataType:"jsonp",
					  	jsonp: "jsonpCallback",
					  	async:true,
					  	success:function(res){
					  		if(res.code==-1){
					  			createCode();
					  		}
	//				  		code=0成功   code=-1手机号已被注册
							cont.text(res.message).show().delay(3000).fadeOut();
							if(res.message!="成功获取验证码"){
								 clearInterval(timer);
							}
				  		},
				  })
		})
		//点击注册
		var btn=$('#btn');
   	 	btn.click(function(){
    		var phoneNum=$('#user_tel').val();//手机号
    		var pwd=$('#pwd').val()//密码
    		var pwd_length=$('#pwd').val().length;
	        var code=$('#code').val()//验证码
			var phonePattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^(([0\+]\d{2,3})?(0\d{2,3}))(\d{7,8})((\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
    		var hash=hex_md5(pwd).toUpperCase();
    		var cont=$("#cont");
    		//获取URL参数的值
			var url =location.search;
			var Request = new Object(); 
			if(url.indexOf("?")!=-1) 
			{ 
			var str = url.substr(url.indexOf("?")+1); 
			Request[str.split("=")[0]]=(str.split("=")[1]); 
			user_from = Request["user_from"];
			}else{
				user_from="";
			}
    		if(!checkVar(phoneNum)){
			 	cont.text("*请输入手机号").show().delay(3000).fadeOut();
			 	return;
			 }else if(phonePattern.test(phoneNum)==false){
			 	cont.text("*请输入正确的手机格式").show().delay(3000).fadeOut();
			 	return;
			 }
			 else if(!checkVar(code)){
			 	cont.text("*请输入手机验证码").show().delay(3000).fadeOut();
			 	return;
			 }
			 else if(!checkVar(pwd)){
			 	cont.text("*请输入6-12位密码").show().delay(3000).fadeOut();
			 	return;
			 }else if(pwd_length<6||pwd_length>12){
			 	cont.text("*请输入6-12位密码").show().delay(3000).fadeOut();
			 	}
    		$.ajax({
    			type:"post",
    			async:true,
    			url:"http://api.zhuliqianbao.com/lygj/guanjia_api/act/light-loan-lyb/register3?phone="+phoneNum+"&password="+hash+"&code="+code+"&user_from="+user_from,
    			success:function(res){
					if(res.code==0){
						cont.text("注册成功,即将前往下载").show().delay(2000).fadeOut();
						setTimeout(function(){
							window.location.href="weixin.html"
						},2000)
					}
					else if(res.code==-1){
						cont.text(res.message).show().delay(3000).fadeOut();
					}
    			}
    		});
    	})