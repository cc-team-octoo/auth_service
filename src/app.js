const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");

// Set the default templating engine to ejs
app.set("view engine", "ejs");

// Ustawienia dla plików statycznych (np. css)
app.use(express.static(__dirname + "/public"));

mongoose
  .connect(
    "mongodb+srv://cc-team-octoo:kJHJ8%21iJJhj@cluster0-fxhbq.azure.mongodb.net/test?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB...", err));

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    // mail: { type: String, unique: true, required: true },
    password: { type: String, required: true, minlength: 6, maxlength: 100 },
    admin: Boolean
  },
  { timestamps: { createdAt: "created_at" } }
);

const User = mongoose.model("User", userSchema);

app.get("/logowanie", (req, res) => {
  const title = "Logowanie";
  res.render("pages/login", { title: title });
});

app.get("/rejestracja", (req, res) => {
  const title = "Rejestracja";
  res.render("pages/signup", { title: title });
});

//Create update user route
app.put("/user/:id", (req, res) => {
  const condition = { _id: req.params._id };

  User.update(condition, req.body)
    .then(doc => {
      if (!doc) {
        return res.status(404).end();
      }
      return res.status(200).json(doc);
    })
    .catch(err => next(err));
});

//PORT listening
const port = process.env.PORT || 3000;
app.listen(port, () =>
  console.log(`auth_service app listening on port ${port}...`)
);
