const mongoose = require("mongoose"),
    bookSchema = mongoose.Schema({ // https://stackoverflow.com/questions/36172891/preventing-duplicate-records-in-mongoose
        name: { type: String, unique: true, required: true }, // [SchemaTypes](https://mongoosejs.com/docs/schematypes.html)
        isbn_13: { type: Number, unique: true },
        isbn_10: { type: Number, unique: true },
        author: { type: String },
        edition: { type: String },
        binding: { type: String },
        publisher: { type: String },
        published: { type: Date } // [Dates Schema](https://mongoosejs.com/docs/tutorials/dates.html)
    });
module.exports = mongoose.model("book", bookSchema);