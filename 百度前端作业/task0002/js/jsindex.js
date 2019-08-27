var box = document.getElementById("box");
var img = document.getElementsByTagName("img");
var li = document.getElementsByTagName("li");
var c = 0;

setInterval(function () {
    c++;
    c  = c==4 ? 0: c;
    // 让所有图片都隐藏
    for (var i = 0, len = img.length; i < len; i++){
        img[i].style.display = "none";
        li[i].style.background = "#DDDDDD"
    }
    // 让c号图片显示
    img[c].style.display = "block";
    // 让c号小圆点变红
    li[c].style.background = "#A10000";
},1000);