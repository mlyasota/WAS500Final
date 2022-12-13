const book = require("../models/book");

exports.getAllBooks = (req, res, next) => {
    book.find({}, (error, books) => {
      if (error) next(error);
      req.data = books;
      next();
    });
};

exports.getBookID = (req, res, next) => {
    // https://www.geeksforgeeks.org/mongoose-findone-function/
    book.findOne({_id: `${req.params.bookID}`}, (error, bookID) => {
      if (error) next(error);
      req.data = bookID;
      next();
    });
};

exports.deleteBookID = (req, res, next) => {
  book.deleteOne({_id: `${req.params.bookID}`}, (error) => {
    if (error) next(error);
    next();
  });
};