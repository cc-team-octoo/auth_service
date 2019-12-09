const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const userSchema = new mongoose.Schema({
  name: String,
  mail: { type: String, unique: true },
  admin: Boolean
});

const User = mongoose.model("User", userSchema);

const user = new User({
  name: "Mirosław Biedrowski",
  mail: "biedrowski.miroslaw@wp.pl",
  admin: true
});
