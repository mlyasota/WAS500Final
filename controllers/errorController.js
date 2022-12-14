const httpStatus = require("http-status-codes");

exports.logErrors = (error, req, res, next) => {
    console.log("logging new error!");
    console.error("here it is", error.stack);
    next(error);
};

exports.respondNoResourceFound = (req, res) => {
    // let errorCode = httpStatus.StatusCodes.NOT_FOUND;
    // res.status(errorCode);
    // res.send(`${errorCode} | The page does not exist!`);
    res.send('<img src="/images/404.jpg" alt="img"/>');
};
  
exports.respondInternalError = (error, req, res, next) => {
    // let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;
    // console.log(`ERROR occurred: ${error.stack}`);
    // res.status(errorCode);
    // res.send(`${errorCode} | Sorry, our application is experiencing a problem!`);
    res.send('<img src="/images/500.jpg" alt="img"/>');
};