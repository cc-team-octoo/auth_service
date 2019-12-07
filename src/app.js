const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const userSchema = new mongoose.Schema({
  name: String,
  mail: String,
  admin: Boolean
});

const Users = mongoose.model("Users", userSchema);

const users = new Users({
  name: "Mirosław Biedrowski",
  mail: "biedrowski.miroslaw@wp.pl",
  admin: true
});
