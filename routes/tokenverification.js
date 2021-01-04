const jwt =require("jsonwebtoken");
const path = require('path'); 

module.exports = function(req,res,next) {
    const token = req.header("auth-token");
    if(!token){
        return res.sendFile(path.resolve("./public/redirect.html")) //redirecting user to redirect page
    };
    try {
        const verification = jwt.verify(token, process.env.SECRETTOKEN);
        req.user = verification;
        next();
    }catch(err){
        res.status(400).send("This token is invalid")
        
    }
}