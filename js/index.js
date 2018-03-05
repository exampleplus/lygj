				var host="http://api.zhuliqianbao.com/lygj/"
//				var host="http://192.168.1.63:8080/"
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
				imgCap.attr("src",host+"captcha.svl?RCaptchaKey="+timestamp);
			function createCode(){
				var timestamp2 = (new Date()).valueOf();
				imgCap.attr("src",host+"captcha.svl?RCaptchaKey="+timestamp2);
				hide.val(timestamp2);
			}
			//点击发送验证码
			var sendcode=$('#sendcode');
			sendcode.click(function(){
				var phonePattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^(([0\+]\d{2,3})?(0\d{2,3}))(\d{7,8})((\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
				var phoneNum=$('#user_tel').val();//手机号
//		        var pwd=$('#pwd').val()//密码
		        var code=$('#code').val()//手机验证码
		        var inputCode=$("#inputCode").val();//图形验证码
		        var reg =/\s/;//是否有空格正则
//					while(inputCode.indexOf(" ")!=-1)
//					{
//					 	inputCode=inputCode.replace(" ","");
//					}
//		       console.log(inputCode)
		        var cont=$("#cont");
				var times=60;
				var timer=null;
				var val=$("#hide").val();
				var url1=host+"guanjia_api/act/light-loan-lyb/registerCode2/"+phoneNum+"/"+inputCode+"?RCaptchaKey="+val;
				 if(!checkVar(phoneNum)){
				 	cont.text('*请输入手机号').show().delay(2000).fadeOut();
				 	return;
				 }else if(phonePattern.test(phoneNum) == false){
				 	cont.text('*请输入正确的手机格式').show().delay(2000).fadeOut();
				 	return;
				 }else if(!checkVar(inputCode)){
				 		cont.text('*请输入图形验证码').show().delay(2000).fadeOut();
				 		return;
				 }else if(reg.test(inputCode) == true){
				 		cont.text('图形验证码不能含有空格，请在英文输入法下填写').show().delay(2000).fadeOut();
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
				          sendcode.css('background',"#207EFF");
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
								clearInterval(timer);
					  			createCode();
					  			var uid=res.uid;
					  			var mobilePhone=res.mobilePhone;
					  			if(uid == "" || uid == undefined || uid == null ){
					  				uid="";
					  				mobilePhone="";
					  			}
					  			cont.text(res.message).show().delay(1000).fadeOut();
					  			if(res.message=="图形验证码错误"){
					  				return;
					  			}
					  			setTimeout(function(){
					  				window.location.href="http://api.zhuliqianbao.com/qb?uid="+uid+"&mobilePhone="+mobilePhone;
//					  				window.location.href="../../zlqb/index.html?uid="+uid+"&mobilePhone="+mobilePhone;
					  			},2000)
					  		}
					  		cont.text(res.message).show().delay(1000).fadeOut();
//					  		if(res.message!="成功获取验证码"){
//								 	clearInterval(timer);
//								}
	//				  		code=0成功   code=-1手机号已被注册
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
    			url:host+"guanjia_api/act/light-loan-lyb/register3?phone="+phoneNum+"&pwd="+hash+"&code="+code+"&user_from="+user_from,
    			success:function(res){
    				var uid=res.uid;
    				var mobilePhone=res.mobilePhone;
    				console.log(uid)
					if(res.code==0){
						cont.text("注册成功,即将前往下载").show().delay(2000).fadeOut();
						sessionStorage.setItem("uid",uid);
						sessionStorage.setItem("mobilePhone",mobilePhone);
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