const errorResponder = (err, res) => {
    if (process.env.NODE_ENV === 'dev') {
        // dev env
        res.status(err.statusCode).json({
            name: err.name,
            message: err.message,
            error: err,
            stack: err.stack
        });

    } else {
        // prod env
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: 'error',
                message: err.message
            });
        } else {
            // log 紀錄
            console.error('出現重大錯誤', err);
            // 送出罐頭預設訊息
            res.status(500).json({
                status: 'error',
                message: '系統錯誤，請恰系統管理員'
            });
        }
    }
};


module.exports = errorResponder;