const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createToken = (user) => {
    return jwt.sign(
        {id: user._id},
        process.env.JWT_KEY,
        {expiresIn: "7d"}
    )
};

exports.register = async(req, res) => {
    try{
        const {username, email, password} = req.body;

        const existingUser = await User.findOne({email});
        if(existingUser)
            return res.status(400).json({message: "Email already exists"});

        //Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const token = createToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 1000*60*60*24*7
        })
        .status(201)
        .json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};


exports.login = async(req, res) => {
    try{
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user)
            return res.status(400).json({message: "User not found"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).json({message: "Invalid credentials"});

        const token = createToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'lax',
            maxAge: 1000*60*60*24*7
        })
        .status(200)
        .json({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            },
        });
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};


exports.logout = async(req, res) => {
    try{
        res.cookies("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })
        .status(200)
        .json({message: "Logged out successfully"})
    } catch(err){
        console.log(err);
        res.status(500).json({message: "Logout failed"});
    }
}

exports.getCurrentUser = async(req, res) => {
    try {
        if(!req.user){
            return res.status(401).json({message: "Not authenticated"});
        }

        const user = req.user;
        res.status(200).json({user});
    } catch (err) {
        console.error("Error fetching current user:", err);
        res.status(500).json({message:  "Failed to fetch current user"});
    }
}