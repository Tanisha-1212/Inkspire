const jwt = require('jsonwebtoken');
const User =  require("../models/User");

exports.isLoggedIn = async (req, res)=>{
    try{
        const token = req.cookies.token;

    if(!token)
        return res.status(401).json({message: "Not Authenticated"});

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = decoded;

    next();
    }catch(err){
        return res.status(401).json({message: "Invalid token"});
    }
}