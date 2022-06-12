const handleErrorAsync = function handleErrorAsync(func) {
    // func 先將 async fun 帶入參數儲存
    // middleware 先接住 router 資料
    return function (req, res, next) {
        //再執行函式，async 可再用 catch 統一捕捉
        //這裡的catch是promise-based中的catch，不是tyr&catch。 
        //-> 所以其實也可以被unhandledRejection抓到
        func(req, res, next).catch(
            function (error) {
                return next(error);
            }
        );
    };
};

module.exports = handleErrorAsync;