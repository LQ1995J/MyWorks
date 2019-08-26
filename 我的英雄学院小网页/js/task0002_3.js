        window.onload = function() {
            var list = document.getElementById('list');
			var prev = document.getElementById('prev');
            var next = document.getElementById('next');
			var buttons = document.getElementById('buttons').getElementsByTagName('span');
            var index = 1;

            function animate(offset) {
                //获取的是style.left，是相对左边获取距离，所以第一张图后style.left都为负值，
                //且style.left获取的是字符串，需要用parseInt()取整转化为数字。
                var newLeft = parseInt(list.style.left) + offset;
                list.style.left = newLeft + 'px';
				 if(newLeft < -3000){      //如果五张图片轮播结束则返回第一张
					  list.style.left = -600 + 'px';
				 }
				 if(newLeft > -600){ //点击prev时如果第一张则跳至第五张
					  list.style.left = -3000 + 'px';
 }
            }
			
			//控制小圆点样式
		    function buttonsShow() {
                //这里需要清除之前的样式
                for (var i = 0; i < buttons.length; i++) {
                    if (buttons[i].className == 'on') {
                        buttons[i].className = '';
                    }
                }
                //数组从0开始，故index需要-1
                buttons[index - 1].className = 'on';
            }

            prev.onclick = function() {             
                index -= 1;
                if (index < 1) {
                    index = 5;
                }
                buttonsShow();
                animate(600);
            }
            next.onclick = function() {  
                //由于上边定时器的作用，index会一直递增下去，我们只有5个小圆点，所以需要做出判断
                index += 1;
                if (index > 5) {
                    index = 1;
                }
                buttonsShow();
                animate(-600);
            }
			
			
			//这里我们是用setInterval()，因为我们的图片需要循环滚动。
			var timer;
			//重复执行的定时器
			function play() {
				 //将轮播图换成向右切换图片
				timer = setInterval(function () {
					next.onclick()
				}, 2000);  //每间隔2s就自动执行一次匿名函数
			}
			play();
			
			
			var container = document.getElementById('container');
			
			//图片停住
            function stop() {
                clearInterval(timer);
            }
            container.onmouseover = stop;
            container.onmouseout = play;
			
			//控制小圆点
			for (var i = 0; i < buttons.length; i++) {
                // 这里使用的是立即执行函数，
                (function(i) {
                    buttons[i].onclick = function() {
						/* 偏移量获取：这里获得鼠标移动到小圆点的位置，用this把index绑定到对象buttons[i]上，去谷歌this的用法  */
					/* 由于这里的index是自定义属性，需要用到getAttribute()这个DOM2级方法，去获取自定义index的属性*/
                        var clickIndex = parseInt(this.getAttribute('index'));
                        var offset = 600 * (index - clickIndex); 
                        animate(offset);//存放鼠标点击后的位置，用于小圆点的正常显示 
                        index = clickIndex; //把当前的原点索引赋值给index
                        buttonsShow();   //当点击小圆点时其样式跟着改变
                    }
                })(i)
            }

			
        }
		
		