## DOM原生库封装
- 封装库的惰性思想
    - 我们封装库的方式使用单例的方式，然后将单例放到一个自执行函数中，基本的形式为：
```
var utils = (function () {
    function children(curEle, tagName) {
        // ...
    }

    return {
        children: children
    }
})();
```

- 这时候我们可以将判断是否是IE6~8的方法，放在自执行函数中，然后在具体的方法中使用：
```
var utils = (function () {
    var flag = "getComputedStyle" in window;
    function children(curEle, tagName) {
        if(!flag){
            // IE6~8的情况
        } else {
            // 非IE6~8
        }
    }

    return {
        children: children
    }
})();
```
- 在自执行函数中的flag变量不销毁，存储的是判断当前浏览器是否兼容getComputedStyle，兼容的话是标准浏览器，但是如果flag=false，说明当前浏览器是IE6~8。