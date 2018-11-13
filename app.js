//使用express构建web服务器 --11:25
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
/*引入路由模块*/
//const index=require("./routes/index");
const details=require("./routes/details");
const products=require("./routes/products");
const users=require("./routes/users");
const cart=require("./routes/cart");

var app = express();
app.listen(3000);
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
app.use(express.static('public'));
app.use(session({
    secret: '128位随机字符串',
    resave: false,
    saveUninitialized: true,
}));
//req.session
/*使用路由器来管理路由*/
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


//app.use("/index",index);
app.use("/details",details);
app.use("/products",products);
app.use("/users",users);
app.use("/cart",cart);


//接口地址http://localhost:3000/details/?lid=5

