/* 封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
 * @param opt.type  回调数据类型 text||xml
 */
function ajax(opt) {
  // 设置参数默认值
  opt = opt || {};  //opt以数组方式存参，如果参数不存在就为空。
  opt.method = opt.method.toUpperCase() || 'POST';
  opt.url = opt.url || ''; //检查URL是否为空
  opt.async = opt.async || true;  // 默认为同步
  opt.data = opt.data || null;
  opt.success = opt.success || function () {
    alert("默认回调函数");
  };
  opt.type = opt.type || "text";
  opt.type = opt.type.toLowerCase();

  var xhr = null;
  // 初始化XMLHttpRequest 对象
  if (XMLHttpRequest) {
    xhr = new XMLHttpRequest(); //如果XMLHttpRequest存在就新建，IE大于9&&非IE有效
  }
  else {
    xhr = new ActiveXObject('Microsoft.XMLHTTP'); //IE 浏览器
  }

  //异常，创建对象实例失败
  if (!xhr) {
    window.alert("不能创建XMLHttpRequest对象实例.");
    return false;
  }


  var params = [];
  for (var key in opt.data) {
    params.push(key + '=' + opt.data[key]); //将opt里的data push到params里
  }

  var postData = params.join('&');

  if (opt.method.toUpperCase() === 'POST') {
    xhr.open(opt.method, opt.url, opt.async);  //发起请求
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');    // setRequestHeader()：POST传数据时，用来添加 HTTP 头，然后send(data)，注意data格式；GET发送信息时直接加参数到url上就可以，比如url?a=a1&b=b1
    xhr.send(postData);
  }
  else if (opt.method.toUpperCase() === 'GET') { //get 不能发送数据
    xhr.open(opt.method, opt.url + '?' + postData, opt.async);
    xhr.send(null); //发送空数据
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) { //200: 服务器成功返回了页面    4: 请求已完成，且响应已就绪（下载操作已完成）
      //成功之后调用回调函数
      if (opt.type == "xml") {
        opt.success(xhr.responseXML);
      }
      else if (opt.type == "text") {
        opt.success(xhr.responseText);
      }

    }
  };
}