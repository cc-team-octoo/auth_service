const express = require("express");
const app = express();
const port = 3000;

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

const user = new User({
  name: "Mirosław Biedrowski",
  // mail: "biedrowski.miroslaw@wp.pl",
  password: "Testowe123!",
  admin: true
});
