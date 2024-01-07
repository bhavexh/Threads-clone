const User = require('../models/userModel');
const bcrypt = require('bcryptjs'); 
const generateTokenAndSetCookies = require('../utils/helper/generateTokenAndSetCookies');

const signupUser = async (req, res) => {
    try {
        const {name, email, username, password} = req.body;
        const user = await User.findOne({$or: [{email}, {username}]});

        if(user) {
            return res.status(400).json({error: "User already exists"});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            username,
            password: hashedPassword
        })
        await newUser.save();

        if(newUser) {
            generateTokenAndSetCookies(newUser._id, res);
            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username,
            })
        }else{
            res.status(400).json({error: "Invalid user data"});
        }

    } catch (error) {
        res.status(400).json({error : error.message});
        console.log("Error in signupUser: ", error.message)
    }
}

const loginUser = async (req, res) => {
    try{
        const {username, password} = req.body;

        const user = await User.findOne({username});
        const isPassword = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPassword) {
            return res.status(400).json({error: "Invalid username or password"});
        }

        generateTokenAndSetCookies(user._id, res);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
        })

    } catch(error) {
        res.status(400).json({error : error.message});
        console.log("Error in loginUser: ", error.message)
    }
}

module.exports = {signupUser, loginUser};