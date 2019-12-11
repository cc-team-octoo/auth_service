const express = require("express");
const app = express();
const port = 3000;
const Joi = require("joi");

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const userSchema = new mongoose.Schema({
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
});

const User = mongoose.model("User", userSchema);

// const user = new User({
//   name: "Mirosław Biedrowski",
//   // mail: "biedrowski.miroslaw@wp.pl",
//   password: "Testowe123!",
//   admin: true
// });

function validateUser(user) {
  const schema = Joi.object().keys({
    name: Joi.string()
      .min(8)
      .max(50)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
      .max(20)
      .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/) //special/number/capital
  });
  return Joi.validate(user, schema);
}
