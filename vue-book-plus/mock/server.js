let http = require('http');
let fs = require('fs');
let url = require('url');


/*获取轮播图 /sliders*/
let sliders = require('./sliders'); //引入sliders.js文件

function read(cb) {
  fs.readFile('./book.json', 'utf8', function (err, data) {
    if (err || data.length == 0) {
      cb([]);  // 如果有错误，或者文件没长度，就是空数组
    } else {
      cb(JSON.parse(data));  //将读出来的内容转化为对象
    }
  })
}

function write(data, cb) {  //写入内容，传入的data将覆盖book.json,成功后调用回调函数cb
  fs.writeFile('./book.json', JSON.stringify(data), cb)
}

// write({},function () {
//
// });

/*read(function (books) {  //books代表所有图书
  console.log(books);
});*/

let pageSize = 5; //每页显示

// 使用 http.createServer() 方法创建服务器，并使用 listen 方法绑定 8888 端口。 函数通过 request, response 参数来接收和响应数据。
http.createServer((req, res) => {
  /*  //node 跨域头 解决跨域方法
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.setHeader("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method == "OPTIONS") return res.end();*/
  /*让options请求快速返回*/


  let {pathname, query} = url.parse(req.url, true);  //true把query转化成对象

  if (pathname === '/page') {
    let offset = parseInt(query.offset) || 0;  //所有的路径（query.offset）都是字符串  //拿到当前前端传递的值
    read(function (books) {
      // 每次偏移量 在偏移的基础上增加五条
      let result = books.reverse().slice(offset, offset + pageSize); //数据倒序
      let hasMore = true;  //默认有更多
      if (books.length <= offset + pageSize) {  //已经显示的数目大于了总共条数
        hasMore = false;
      }
      res.setHeader('Content-Type', 'application/json; charset=utf8');
      res.end(JSON.stringify({hasMore, books: result}));
    });


    return;
  }

  if (pathname === '/sliders') {
    res.setHeader('Content-Type', 'application/json; charset=utf8');
    return res.end(JSON.stringify(sliders));
  }
  if (pathname === '/hot') {  //热门图书 一个路径对应一个接口，每个路径返回不同的结果，这就是路由
    read(function (books) {
      let hot = books.reverse().slice(0, 6);
      res.setHeader('Content-Type', 'application/json; charset=utf8');
      setInterval(function () {
        res.end(JSON.stringify(hot));
      }, 500)
    });
    return
  }
  if (pathname === '/book') {  //对书的增删改查
    let id = parseInt(query.id);   //取出的是字符串，对象里的id，使用parseInt可转化成数值类型

    switch (req.method) {  // ?id=1
      case 'GET':
        if (!isNaN(id)) {   // 查询一个
          read(function (books) {
            let book = books.find(item => item.bookId === id);
            if (!book) {
              book = {};
            }   //如果没找到book，则book为undefined，则令他为空
            res.setHeader('Content-Type', 'application/json; charset=utf8');
            res.end(JSON.stringify(book));
          })
        } else { //获取所有图书
          read(function (books) {
            res.setHeader('Content-Type', 'application/json; charset=utf8');
            res.end(JSON.stringify(books.reverse()))
          })
        }
        break;
      case 'POST':
        let str = '';
        req.on('data', function (chunk) {
          str += chunk;
        });
        req.on('end', function () {
          let book = JSON.parse(str);
          read(function (books) {  //添加id
            book.bookId = books.length ? books[books.length - 1].bookId + 1 : 1;
            books.push(book);
            write(books, function () {  // 将数据放到内存中的books中
              res.end(JSON.stringify(book));
            })
          });
        });
        break;
      case 'PUT':
        if (id) { // 获取了当前的要修改的id
          let str = '';
          req.on('data', (chunk) => {
            str += chunk;
          });
          req.on('end', () => {
            let book = JSON.parse(str); //book要改成什么样子
            read(function (books) {
              books = books.map(item => {
                if (item.bookId === id) {  //找到id相同的那一本书，用新的覆盖掉老的
                  return book
                }
                return item;  // 其他书正常返回即可
              });
              write(books, function () {  //将数据写回JSON中  //将所有书写入成功后会调用回调函数
                res.end(JSON.stringify(book))
              })
            })
          });
        }
        break;
      case 'DELETE':
        read(function (books) {
          books = books.filter(item => item.bookId !== id);
          write(books, function () {
            res.end(JSON.stringify({}));  //删除返回空对象
          })
        });
        break;
    }
    return
  }


  //静态接口
  // 读取一个路径
  fs.stat('.' + pathname, function (err, stats) {
    if (err) {
      fs.createReadStream('index.html').pipe(res);
    } else {

      if (stats.isDirectory()) {
        let p = require('path').join('.' + pathname, './index.html');
        res.setHeader('Content-Type', 'text/css; charset=utf8');
        fs.createReadStream(p).pipe(res);
      } else {
        res.setHeader('Content-Type', 'text/css; charset=utf8');
        fs.createReadStream('.' + pathname).pipe(res);
      }
    }
  });

}).listen(3000);  //设置端口为3000
