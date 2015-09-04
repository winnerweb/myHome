/*
*	页面翻转
*	功能：页面翻动，页面内部class为container的容器进行180度翻转
*	将所有页面class设置page
*/
(function($){
	window.onload = function(){
		new myHomeMain();
		//进度条
		// $('.onload').css('display','none');
		
	}
	// 主函数
	var myHomeMain = function(){
		this.init();
	}
	myHomeMain.prototype = {
		// 参数配置
		data:{
			// 页面计数器
			count: 1,
			// 所有页面
			$pageEle: $('.page'),
			// 首页显示
			introduce: '我是许岩，现就读于哈尔滨理工大学测通学院物联网工程专业，爱前端，爱游戏，爱运动。性格开朗、稳重、有活力，待人热情、真诚，能吃苦耐劳，有较强的实际动手能力和团体协作精神。',
			mobileTo:''
		},
		
		// 页面滚动函数
		init: function() {
			var event,
				_this = this,
				pageLen = _this.data.$pageEle.length,
				ele = document.getElementsByTagName('body')[0];
			_this.addEvent(ele, 'mousewheel', handler);
			function handler(e){
				event = e||window.event;
				if(event.wheelDelta < 0){
					_this.down(ele, pageLen, handler);
				}else{		
					_this.up(ele, handler);			
				}
				return false;	
			}
			_this.introduce();
			_this.ctrlTo();
			_this.mobile();
			_this.leftCtrl();
			_this.skillPre();
		},

		// 鼠标滚轮下滑 fn 回调函数
		down: function(ele, pageLen, handler, fn) {
			var _this = this;
			if(_this.browser().mobile === true){
				$('body').unbind('touchmove');
				var timerMobile = setTimeout(function(){
					_this.mobile();
				},800);
			}
			_this.removeEvent(ele, 'mousewheel',handler);
			// 延迟事件
			var timer = setTimeout(function(){
				_this.addEvent(ele, 'mousewheel',handler);
			},1000);
			if(_this.data.count < pageLen){
				console.log(_this.data.count);
				$('.page' + _this.data.count).css({
					'top': '-100%'
				});
				$('.page' + _this.data.count + '>.container').removeClass('rotateL rotateR');
				_this.data.count++;
				$('.page' + _this.data.count).css({
					'top': '0'
				});
				$('.page' + _this.data.count + '>.container').addClass('rotateL');
			}else if(_this.data.count == pageLen){
				$('.page:not(".page1,.page' + pageLen + '")').css({
					'top': '100%',
					'display':'none'
				});
				$('.page' + pageLen).css('top', '100%');
				$('.page' + _this.data.count + '>.container').removeClass('rotateL rotateR');
				$('.page1').css({
					'top':'0px'
				});
				$('.page1>.container').addClass('rotateR');
				_this.data.count = 1;
				setTimeout(function(){
					$('.page:not(".page1,.page' + pageLen + '")').css({
						'display':'block'
					});
				}, 800);
			}
			_this.leftCtrl();
			this.skill(this.data.count);
		},
		// 鼠标滚轮上滑
		up: function (ele, handler) {
			var _this = this;
			if(_this.browser().mobile === true){
				$('body').unbind('touchmove');
				var timerMobile = setTimeout(function(){
					_this.mobile();
				},800);
			}
			_this.removeEvent(ele, 'mousewheel', handler);
			var timer = setTimeout(function(){
				_this.addEvent(ele, 'mousewheel', handler);
			},1000);
			if(_this.data.count > 1){
				console.log(_this.data.count);
				$('.page' + _this.data.count).css({
					'top': '100%'
				});
				$('.page' + _this.data.count + '>.container').removeClass('rotateL rotateR');
				_this.data.count--;
				$('.page' + _this.data.count).css({
					'top': '0'
				});
				$('.page' + _this.data.count + '>.container').addClass('rotateR');
			}
			_this.leftCtrl();
			this.skill(this.data.count);
		},
		// 事件绑定
		addEvent:function (ele,type,fn) {
			if (ele.addEventListener) {
				ele.addEventListener(type,fn,false);
			}else{
				// console.log(111);
				ele.attachEvent('on'+type,function(){
					// 用来修改代码执行的作用域
					fn.call(ele);
				});
			}
		},
		// 事件解绑
		removeEvent:function (ele,type,fn) {
			if (ele.removeEventListener) {
				ele.removeEventListener(type,fn,false);
			}else{
				ele.detachEvent('on'+type,fn);
			}
		},
		// 取消冒泡
		cancelBubble: function (e) {
			var event = e || window.event;
			if (event.stopPropagation) {
				event.stopPropagation();
			}else{
				event.cancelBubble = true;
			}
		},
		// 首页自我介绍
		introduce : function(){
			
			var	_this = this,
				str = _this.data.introduce,
				arr = str.split('');			
				ele = document.getElementsByClassName('introduce')[0];
				// 移动端样式
				if(_this.browser().mobile === true){
					// console.log(_this.browser().mobile);
						$('.introduce').css({
							'width': '70%',
							'font-size': '1.1em',
							'line-height': '1.6em',
							'padding': '20px'
					});
				}
			var timerInt = setInterval(function(){
				if(arr.length > 0){
					ele.innerHTML += arr.shift();
				}else {
					clearInterval(timerInt);
				}
			},100);
		},
		// 第二页掌握技能
		skill: function(count){
			if(this.browser().mobile === true){
				if(count==2){	
					setTimeout(function(){
						$('#skill1,#skill2').css('width','250px');
						$('#skill3').css('width','200px');
						$('#skill4').css('width','180px');
						$('#skill5').css('width','160px');
						$('#skill6').css('width','80px');
					},1000);
				}else{
					$('#skill>li').css('width','0px');
				}	
			}else{
				if(count==2){	
					setTimeout(function(){
						$('#skill1,#skill2').css('width','600px');
						$('#skill3').css('width','550px');
						$('#skill4').css('width','400px');
						$('#skill5').css('width','350px');
						$('#skill6').css('width','300px');
					},1000);
				}else{
					$('#skill>li').css('width','0px');
				}	
			}	
		},
		skillPre:function(){
			$('#skill>li').mouseenter(function(e){
				var list = e.currentTarget.children;
				$(list).css('display','block');
			}).mouseleave(function(e){
				var list = e.currentTarget.children;
				$(list).css('display','none');
			});
			if(this.browser().mobile === true){
				$('#skill>li').css({
					'height': '20px',
					'font-size': '10px',
					'line-height': '20px'
				});
				$('#skill').css('left','0px');
				$('#skill>li>.list>li').css({
					'line-height':'20px',
				});
			}
		},
		// 左侧控制圆点
		leftCtrl: function(){
			count = this.data.count;
			$('.leftCtrl>ul>li[index='+ count + ']').css({
				'background-color':'#000',
				'border':'3px solid #fff'
				// 'border':'2px solid #fff'
			});
			$('.leftCtrl>ul>li:not([index='+ count + '])').css({
				'background-color':'#fff',
				'border':'none'
			});
			this.skill(this.data.count);
		},
		// 左侧小圆点以及导航的事件绑定
		ctrlTo: function(){
			var _this = this;
			$('.leftCtrl>ul>li').click(function(e){
				// console.log(e);
				// console.log($(this).attr('index'));
				_this.toPage($(this).attr('index'));
			});
			$('.dropdown-menu>li>a').click(function(e){
				_this.toPage($(this).attr('index'));
			});
		},
		// 直接跳转到某页
		toPage: function(toPage){
			var _this = this;
			$('.page .container').removeClass('rotateL rotateR');
			$('.page' + toPage + ' .container').addClass('rotateR');
			for (var i = 1; i <=  _this.data.$pageEle.length; i++) {
				if(i!=toPage && i!=_this.data.count){
					$('.page' + i).css({
						'display':'none'
					});
				}
				if(i<toPage){
					$('.page' + i).css({
						'top': '-100%',
					});
				}else if(i>toPage){
					$('.page' + i).css({
						'top': '100%',
					});
				}else{
					$('.page' + i).css({
						'top': '0'
					})
				}
			};
			_this.data.count = toPage;
			_this.leftCtrl();
			setTimeout(function(){
				$('.page:not(.page' + toPage).css({
					'display':'block'
				});
			}, 300);
		},
		// 移动端处理
		mobile: function(){
			var _this = this,
				startX,
				startY,
				moveEndX,
				moveEndY,
				X,
				Y,
				ele = document.getElementsByTagName('body')[0];
			$("body").on("touchstart", function(e) {
			    // e.preventDefault();
			    startX = e.originalEvent.changedTouches[0].pageX;
			    startY = e.originalEvent.changedTouches[0].pageY;
			});
			$("body").bind("touchmove", function(e) {
			    e.preventDefault();
			    moveEndX = e.originalEvent.changedTouches[0].pageX;
			    moveEndY = e.originalEvent.changedTouches[0].pageY;
			    X = moveEndX - startX;
			    Y = moveEndY - startY;
			    if ( Math.abs(X) > Math.abs(Y) && X > 0 ) {
			    	// right
			        _this.data.mobileTo = 'right';
			    }
			    else if ( Math.abs(X) > Math.abs(Y) && X < 0 ) {
			    	// left
			        _this.data.mobileTo = 'left';
			    }
			    else if ( Math.abs(Y) > Math.abs(X) && Y > 0) {
			    	// bottom
			    	console.log('bottom');
			        _this.data.mobileTo = 'bottom';
			        _this.up(ele);

			    }
			    else if ( Math.abs(Y) > Math.abs(X) && Y < 0 ) {
			    	// top
			    	console.log('top');
			        _this.data.mobileTo = 'top';
			         _this.down(ele, _this.data.$pageEle.length);
			    }
			    else{
			    	// just touch
			        _this.data.mobileTo = 'touch';
			    }
			});
		},
		browser: function(){
		    var u = window.navigator.userAgent;
		    return {
		        trident: u.indexOf('Trident') > -1, //IE内核
		        presto: u.indexOf('Presto') > -1, //opera内核
		        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
		        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
		        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
		        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
		        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
		        iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者安卓QQ浏览器
		        iPad: u.indexOf('iPad') > -1, //是否为iPad
		        webApp: u.indexOf('Safari') == -1 ,//是否为web应用程序，没有头部与底部
		        weixin: u.indexOf('MicroMessenger') == -1 //是否为微信浏览器
		    }
	   	}
	}
}(jQuery));
			var iSpeedX=6,
				iSpeedY=8;
				$ele1 = "#wrapper1",
				$ele2 = "#wrapper2",
				$ele3 = "#wrapper3",
				$ele4 = "#wrapper4",
				$ele = ".wrapper"
			var stop = false;
			$('#stop').click(function(e){
        		console.log(e);
        		stop = true;
        	})
        	$('#start').click(function(e){
        		if (stop) {
        			startMove();
        			console.log(e);
        			stop =false;
        		};	
        	})
        function move($ele, iSpeedX, iSpeedY){
        	setTimeout(function(){
        		var ele = $($ele),
        			left = ele.position().left + iSpeedX,
        			top = ele.position().top + iSpeedY;
        			console.log(left,top);
        		// 下边缘
        		if(top >= ele.parent().height() - ele.height()){
        			iSpeedY *= -1;
        			top = ele.parent().height() - ele.height();
        		}
        		// 上边缘
        		if(top <= 0){
        			iSpeedY *= -1;
        			top = 0;
        		}
        		// 左边缘
        		if(left <= 0){
        			iSpeedX *= -1;
        			left = 0;
        		}
        		// 右边缘
        		if(left >= ele.parent().width() - ele.width()){
        			iSpeedX *= -1;
        			left = ele.parent().width() - ele.width();
        		}
        		ele.css({
        			'left': left+'px',
        			'top' : top + 'px'
        		});
        		if(!stop){
					move($ele, iSpeedX, iSpeedY);
        		}
        	},30);
        }
        function startMove(){
        	setTimeout(function(){
	        	move($ele1, iSpeedX, iSpeedY)
	        },500);
	        setTimeout(function(){
				move($ele2, iSpeedX, iSpeedY)
	        },1200);
	        setTimeout(function(){
				move($ele3, iSpeedX, iSpeedY)
	        },1900);
	        setTimeout(function(){
				move($ele4, iSpeedX, iSpeedY)
	        },2600);
        }
	    startMove();