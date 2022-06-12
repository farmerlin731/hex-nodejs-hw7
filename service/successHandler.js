const successHandler = (res, data) => {
    res.send({
        "status:":"success",
        data
    });
};

module.exports = successHandler;