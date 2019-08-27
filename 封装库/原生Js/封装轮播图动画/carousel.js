window.onload = function () {
  // 获取图片标签
  var imglist = document.getElementById('imglist');
  var imgs = imglist.getElementsByTagName('li');
  // 获取圆点列表
  var icons = document.getElementById('iconlist').getElementsByTagName('li');

  // 初始化图片位置
  var left = 0;
  imglist.style.marginLeft = left + 'px';
  // 设置一个定时器
  var timer;

  //自调用
  run();

  // 缩小图片左边距的距离
  function run() {
    // 当图片移动到第五张时 1200*5 回到第一张图 left=0
    if (left <= -6000) {
      imglist.style.marginLeft = '0px';
      left = 0;
    }
    //如果位置为整张图片，暂停1s
    var n = (left % 1200 == 0) ? 1000 : 10;
    changeImg();

    // 计算图片下标
    var index = Math.floor(-left / 1200);
    changeIcon(index);

    // 每10ms减10
    left -= 10;
    timer = setTimeout(run, n)
  }

  // setInterval(run, n);

  //改变图片的位置
  function changeImg() {
    imglist.style.marginLeft = left + 'px';
  }


  //改变当前icon颜色
  function changeIcon(index) {
    for (var i = 0; i < icons.length; i++) {
      icons[i].style.backgroundColor = '';
    }
    icons[index].style.backgroundColor = '#666';
  }

  //绑定图片事件
  for (var i = 0; i < imgs.length; i++) {
    (function (i) {
      imgs[i].onmouseover = function () {
        clearTimeout(timer);
        left = -i * 1200;
        changeImg();
        changeIcon(i);
      };
      imgs[i].onmouseout = function () {
        run();
      }
    })(i);
  }
  //绑定icon事件
  for (var i = 0; i < icons.length; i++) {
    (function (i) {
      icons[i].onmouseover = function () {
        clearTimeout(timer);
        left = -i * 1200;
        changeImg();
        changeIcon(i);
      };
      icons[i].onmouseout = function () {
        run();
      }
    })(i);}
};