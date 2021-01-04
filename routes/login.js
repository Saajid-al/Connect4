const express = require("express");
const router = require("express").Router();
const app = express();
const {registerValidation} = require("../validate");
const {loginValidation} = require("../validate");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
app.use(express.urlencoded({ extended: false }))

//include JOI
//importing body parser to parse the body request
const User = require("../models/users");
const { route } = require("./login");
// an example is /play/friends
const path = require('path'); 
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
router.use(express.static(__dirname + '/public')) //for loading express website
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//login
router.get("/", (req,res) => { 
   // res.send("login page");
   res.sendFile(path.resolve("./public/loginPage.html"))
   console.log("Redirected to LoginPage")
});
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
//signup route
router.get("/signup", (req,res) => { 
    // res.send("login page");
    res.sendFile(path.resolve("./public/register.html"))
    console.log("Redirected to SignUpPage")
 });
 //////////////////////////////////////////////////////////////////////////
 //////////////////////////////////////////////////////////////////////////
//user schema
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
router.post("/signup", async (req,res) => {
    //validating before creating user
   const {error} = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const existingEmail = await User.findOne({email: req.body.email})
    if(existingEmail) return res.status(400).send("This email has already been used.");
    const existingUser = await User.findOne({username: req.body.username})
    if(existingUser) return res.status(400).send("This Username taken.");
//////////////////////////////////////////////////////////////////////////
    //HASHING PASSWORDS so other users cant see
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    
   //creating a new user
   const user = new User({ //setting user schema
        username: req.body.username,
        email: req.body.email,
        password: hashedPass,
   }); 
   console.log("sent to server")

   //saving user to database
   try { 
       const savedUser = await user.save();
       res.sendFile(path.resolve("./public/loginPage.html"));
   }catch(err) {  //catching any error
       res.status(400).send(err)
       res.json({message:err})
   }

});
//////////////////////////////////////////////////////////////////////////

//Login
router.post("/", async(req,res)=> {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
        const user = await User.findOne({username: req.body.username})
        if(!user) return res.status(400).send("User does not exist");
        const pass = await bcrypt.compare(req.body.password, user.password);
        if(!pass) return res.status(400).send("Password is incorrect");

        //token
        const token = jwt.sign({_id: user._id},process.env.SECRETTOKEN)
        //res.header("login-token", token).send(token);
        // res.json({token: token})
        res.sendFile(path.resolve("./public/mainPageTest.html"))
});

module.exports = router;


//for postman
//fill in the schema in the post, and hit send
//this is done in order to work with the database
// router.post("/", (req,res) => {
//     console.log(req.body);
// })

