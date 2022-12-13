const express = require("express"),
  app = express(),
  errorController = require("./controllers/errorController"),
  homeController = require("./controllers/homeController"),
  booksController = require("./controllers/booksController"),
  booksListController = require("./controllers/booksListController"),
  layouts = require("express-ejs-layouts");

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use(express.static("public"));

app.use(layouts);

app.use(
    express.urlencoded({
      extended: true
    })
  );

// app.use(express.static("views"));
// app.use(express.static(__dirname + "../views"));

app.use(express.json());
app.use(homeController.logRequestPaths);

app.get("/", function(req, res){
    res.redirect("/home");
});
app.get("/home", homeController.respondWithName);

app.get(
  "/booksList",
  booksController.getAllBooks,
  (req, res, next) => {
    console.log(req.data);
    res.render("booksList", { books: req.data });
  }
);

app.get(
  "/books/:bookID",
  booksController.getBookID,
  (req, res, next) => {
    console.log(req.data);
    res.render("books", { bookID: req.data });
  }
);

app.get("/contact", (req, res) => {
    res.render('contact');
});
app.get("/survey", (req, res) => {
    res.render('survey');
});
app.get("/honesty", (req, res) => {
    res.render('honesty');
});

app.get(
  "/admin",
  booksController.getAllBooks,
  (req, res, next) => {
    console.log(req.data);
    res.render("admin", { books: req.data });
  }
);

app.get(
  "/edit/:bookID",
  booksController.getBookID,
  (req, res, next) => {
    console.log(req.data);
    res.render("edit", { bookID: req.data });
  }
);

app.post("/edit/updateBook/:bookID", (req, res)=>{
  console.log(req.body);
  console.log(req.params.bookID);

  book.findByIdAndUpdate(req.params.bookID, req.body, (error)=>{
    if (error) { // Will throw error if book name is not unique
      res.redirect("/saveError")
    } else {
      res.redirect("/admin")      
    };
  });
});

app.get("/addnewbook", (req, res) => {
  res.render('addnewbook');
});

app.post("/addnewbook/save", (req, res)=>{ // https://dev.to/mccauley/accepting-data-from-a-form-and-saving-it-to-mongodb-through-mongoose-47i3
  const addBook = new book(req.body)
  addBook.save((error)=>{
      if (error) {
        res.redirect("/saveError")
      } else {
        res.redirect("/admin")      
      };
    });
});

app.get("/saveError", (req, res) => {
  res.render('saveError');
});

app.get(
  "/deleteBook/:bookID",
  booksController.deleteBookID,
  (req, res, next) => {
    console.log(req.data);
    res.redirect("/admin")      
  }
);

// app.use(errorController.logErrors); // Problem: not logging to console
app.use(errorController.respondNoResourceFound);
app.use(errorController.respondInternalError);

const server = app.listen(app.get("port"), () => {
  console.log(`Server running at http://localhost:${app.get("port")}`);
});


const mongoose = require("mongoose");
const book = require("./models/book")
require("dotenv").config();
const uri = process.env.ATLAS_URI; // Sensitive info stored in dotenv (.env)
// const uri = 'mongodb+srv://assignment5:WAS500_mlyasota@was500.t3ddygg.mongodb.net/assignment5' // public: READ_ONLY
mongoose.set('strictQuery', true);
mongoose.connect(uri, { useUnifiedTopology: true});

const db = mongoose.connection;

db.once("open", () => {
  console.log("Successfully connected to MongoDB using Mongoose!");
});

// #############################

// const bookSchema = mongoose.Schema({ // https://stackoverflow.com/questions/36172891/preventing-duplicate-records-in-mongoose
//   name: { type: String, unique: true, required: true }, // [SchemaTypes](https://mongoosejs.com/docs/schematypes.html)
//   isbn_13: { type: Number, unique: true },
//   isbn_10: { type: Number, unique: true },
//   author: { type: String },
//   edition: { type: String },
//   binding: { type: String },
//   publisher: { type: String },
//   published: { type: Date } // [Dates Schema](https://mongoosejs.com/docs/tutorials/dates.html)
// });

// book.create(
//   {
//     name: "",
//     isbn_13: "",
//     isbn_10: "",
//     author: "",
//     edition: "",
//     binding: "",
//     publisher: "",
//     published: ""
//   },
//   function (error, savedDocument) { // need error function to stop node from terminating because of duplicate mongoDB entries
//     if (error) console.log(error);
//     console.log(savedDocument);
//   }
// );

// book.create(
//   {
//     name: "Hacking: The Art of Exploitation, 2nd Edition",
//     isbn_13: 9781593271442,
//     isbn_10: 1593271441,
//     author: "Erickson, Jon",
//     edition: "2nd",
//     binding: "Paperback",
//     publisher: "No Starch Press",
//     published: "December 2008"
//   },
//   function (error, savedDocument) { // need error function to stop node from terminating because of duplicate mongoDB entries
//     if (error) console.log(error);
//     console.log(savedDocument);
//   }
// );

// book.create(
//   {
//     name: "Network Security Through Data Analysis: Building Situational Awareness",
//     isbn_13: 9781449357900,
//     isbn_10: 1449357903,
//     author: "Collins, Michael",
//     edition: "1st",
//     binding: "Paperback",
//     publisher: "O'Reilly Media",
//     published: "December 2014"
//   },
//   function (error, savedDocument) { // need error function to stop node from terminating because of duplicate mongoDB entries
//     if (error) console.log(error);
//     console.log(savedDocument);
//   }
// );

// book.create(
//   {
//     name: "File System Forensic Analysis",
//     isbn_13: 9780321268174,
//     isbn_10: 0321268172,
//     author: "Carrier, Brian",
//     edition: "1st",
//     binding: "Paperback",
//     publisher: "Addison-Wesley Professional",
//     published: "December 2005"
//   },
//   function (error, savedDocument) { // need error function to stop node from terminating because of duplicate mongoDB entries
//     if (error) console.log(error);
//     console.log(savedDocument);
//   }
// );