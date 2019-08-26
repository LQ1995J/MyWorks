    var c = 0;

// 定时器调用的函数
function run () {
    c++;
    c = c==4? 0:c;
    // 让c号图片显示，兄弟图片隐藏
    $("#box img").eq(c).fadeIn(300).siblings("img").fadeOut(300);
    // 让c号li变红，兄弟li变灰
    $("#box ul li").eq(c).css("background-color","#A10000").siblings("li").css("background-color","#DDDDDD");
}

    $("p").hover(function(){
        $("p").css("background-color","yellow");
        alert("移入");
    },function(){
        $("p").css("background-color","pink");
        alert("移chu");
    });
// 设置定时器，控制自动轮播
    var timer = setInterval(run,1000);
    //
    // $("#box").hover(function () {
    //     // 清理定时器
    //     clearInterval(timer);
    // },function () {
    //     timer = setInterval(run,1000);
    // })

    // // 鼠标移入小圆点的效果
    // $("#box ul li").mouseover(function () {
    //     c = $(this).index();
    //     $("#box img").eq(c).fadeIn(300).stop().siblings("img").stop().fadeOut(300);
    //     // 让c号li变红，兄弟li变灰
    //     $("#box ul li").eq(c).css("background-color","#A10000").siblings("li").css("background-color","#DDDDDD");
    // })
    //
    // $(".arrow #prev").click(function () {
    //     c--;
    //     c = c == -1 ? 3:c;
    //     // 让c号图片显示，兄弟图片隐藏
    //     $("#box img").eq(c).stop().fadeIn(300).siblings("img").stop().fadeOut(300);
    //     // 让c号li变红，兄弟li变灰
    //     $("#box ul li").eq(c).css("background-color","#A10000").siblings("li").css("background-color","#DDDDDD");
    //
    // })
    //
    // $(".arrow #next").click(function () {
    //     c++;
    //     c = c == 4 ? 0:c;
    //     // 让c号图片显示，兄弟图片隐藏
    //     $("#box img").eq(c).fadeIn(300).siblings("img").fadeOut(300);
    //     // 让c号li变红，兄弟li变灰
    //     $("#box ul li").eq(c).css("background-color","#A10000").siblings("li").css("background-color","#DDDDDD");
    //
    // })