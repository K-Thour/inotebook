const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Inotebook$madeby@Thour&it'sformakingnotes";
//Route 1: Create a User using: POST "/inotebook/user/create". No login required
router.post(
  "/create",
  // Express-Validator checking everything is okay
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body(
      "password",
      "Enter a valid password containing minimum 8 characters"
    ).isLength({ min: 8 }),
  ],
  // If there are errors, return Bad request and the errors
  async (req, res) => {
    let success = false;
    console.log(req.body);
    const errors = validationResult(req);
    const salt = await bycrypt.genSalt(10);
    req.body.password = await bycrypt.hash(req.body.password, salt);

    if (!errors.isEmpty()) {
      return res.status(200).json({ success, errors: errors.array() });
    }
    const email=new RegExp(req.body.email,"i");
    try {
      // Check whether the user with this email already exists
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        // If the user exists, send an error response
        console.log({success,existingUser});
        return res.status(200).json({ success, message: "Email is already registered." });
      }

      // If user doesn't exist, create a new user
      await User.create(req.body)
        .then((user) => {
          const authtoken = jwt.sign({ user: user.id }, JWT_SECRET);
          res.send({ success: true, authtoken });
        })
        .catch((err) => {
          res.status(200).send({ success, response: err.errorResponse.errmsg });
          console.log({ success, response: err.errorResponse.errmsg });
        });

    } catch (err) {
      // If there are errors, return Bad request and the errors
      res.status(500).send({ success, reason: `Internal Server Error: ${err}` });
    }
  }
);


// Route 2: Authenticate a User using: POST "/api/auth/login". No login required

router.post(
  "/login",
  // Express-Validator checking everything  okay
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  // If there are errors, return Bad request and the errors
  async (req, res) => {
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success,errors: errors.array() });
    }
    // Check whether the user with this email exists already
    const email=new RegExp(req.body.email,"i");
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(200).send({success,reason:"Invalid Credentials"});
    }
    // Check whether the password is correct
    try {
      if (!(await bycrypt.compare(req.body.password, user.password))) {
        return res.status(200).send({success,reason:"Invalid Credentials"});
      }
      // Return a JWT token
      const authtoken = jwt.sign({ user: user.id }, JWT_SECRET);
      res.send({ success:"true",authtoken });
    } catch (err) {
      res.status(500).send({success,reason:`Internal Server Error: \n${err}`});
    }
  }
);

// Route 3: Get loggedin User Details using: POST "/api/auth/getuser". Login required

router.post("/getuser", require("../middleware/fetchuser"), async (req, res) => {
  let success=false
  try {
    const userId = req.user;
    const user = await User.findById(userId).select("-password");
    res.status(200).send({success:true,user});
  } catch (error) {
    res.status(400).send({success,reason:"Internal Server Error"});
  }
});

module.exports = router;
