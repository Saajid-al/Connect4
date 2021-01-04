const express = require("express"); // importing express package
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv =  require("dotenv");
const cors = require("cors");
dotenv.config();
const path = require('path'); 
app.use(express.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));
app.use(cors());


//importing routes
const mainRoute = require("./routes/play");
const loginRoute = require("./routes/login");
const apiRoute = require("./routes/api");


//routing
app.get("/",(req,res) => { 
    res.sendFile(__dirname + "./loginPage.html")
})
app.get("/redirect",(req,res)=>{
    res.sendFile(path.resolve("./public/redirect.html"))
})


//connecting to database
mongoose.connect(process.env.DatabaseConnection, { useUnifiedTopology: true , useNewUrlParser: true}  , ()=> 
    console.log("Connected to the DataBase")
);

//body parser middleware
app.use(bodyParser.json());
app.use("/play", mainRoute);
app.use("/login", loginRoute);
app.use("/api", apiRoute);


//listening
app.listen(3000, ()=> {
    console.log("listening on port 3000")
})
    
const e = require("express")
const io = require("socket.io")(2000)

// let currentPlayer = 1;

// app.get('/currentPlayer', (req, res) => {
//     res.send({currentPlayer: currentPlayer});
// })

// let player = 0;

// app.get('/player', (req, res) => {
//     res.send({player: player});
// })

io.on("connection", socket => {
    // if (player == 0) {
    //     player = 1
    // } else player = 2;
    // socket.on("changeplayer",(position) =>{
    //     currentPlayer = currentPlayer == 1 ? 2 : 1;
    //     io.emit("playerchanged", (currentPlayer, position));
    //     console.log("player is now " + currentPlayer);
    // })
    console.log("New user has joined")
    socket.on("sendchatmsg", message => { 
        io.emit("chatmsg", message) //sending msg to everyone on server except for the person who sent it
        console.log(message, "- message has sent.")
    })
})
