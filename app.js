var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const errorResponder = require('./service/errorResponder');
//router
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var uploadRouter = require('./routes/upload');

//DB
require('./connections');

var app = express();

//不可預期的重大error
process.on('uncaughtException', err => {
    // 記錄錯誤下來，等到服務都處理完後，停掉該 process
    console.error('Uncaughted Exception！')
    console.error(err);
    process.exit(1);
});


// 未捕捉到的 promise catch
process.on('unhandledRejection', (reason, promise) => {
    console.error('未捕捉到的 rejection：', promise, '原因：', reason);
});

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/upload',uploadRouter);

// 404 error
app.use(function (req, res, next) {
    res.status(404).json({
        status: "false",
        message: "您的路由不存在"
    })
})


// 500 error
app.use(function (err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    if (err.name === 'ValidationError') {
        err.message = "資料欄位未填寫正確，請重新輸入！"
        err.isOperational = true;
    }
    errorResponder(err, res);
});



module.exports = app;
