const jwt = require('jsonwebtoken');
const User =  require("../models/User");

exports.isLoggedIn = async (req, res,next)=>{
    try{
        const token = req.cookies?.token;

    if(!token)
        return res.status(401).json({message: "Not Authenticated"});

    let decoded; 

    try{
        decoded = jwt.verify(token, process.env.JWT_KEY);
    }catch(err){
        return res.status(401).json({message: "Unauthorized: Invalid or expired tokens"});
    }

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;

    next();
    }catch(err){
        return res.status(401).json({message: "Invalid token"});
    }
};

exports.verifyToken = async(req, res, next) => {
    try {
        const token = req.cookies?.token;

        if(!token){
            return res.status(401).json({message: 'No token, authorization denied'});
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = await User.findById(decoded.id).select("-password");

        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        req.user = user;
        next();
    } catch (err) {
        console.error("Token verification failed", err);
        return res.status(401).json({messge: "Invalid or expired token"});
    }
}