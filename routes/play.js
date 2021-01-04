const express = require("express");
const router = express.Router();
const app = express();
const verification = require("./tokenverification");
// an example is /play/friends

const { route } = require("./play");

const path = require('path'); 
router.use(express.static(__dirname + '/public'))

router.get("/", verification, (req,res) => { 
   // res.send("login page");
   res.sendFile(path.resolve("./public/mainPageTest.html"))
   console.log("Redirected to main page")

});

router.get("/profile", (req,res) => { 
    res.sendFile(path.resolve("./public/profile.html"))
    console.log("Redirected to Profile")
});
router.get("/chat", (req,res) => { 
    res.sendFile(path.resolve("./public/chat.html"))
    console.log("Redirected to Chat")
});

module.exports = router;