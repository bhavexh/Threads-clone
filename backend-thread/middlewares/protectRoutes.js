const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const protectRoutes = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
    
        if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
        return res.status(404).json({ error: "Unauthorized!!" });
        }
    
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ error: error.message });
        console.log("Error in protectRoutes: ", error.message);
    }
}

module.exports = protectRoutes;