import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if(!token) return res.status(404).json({error : 'Unauthorized!'});

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decode.userId).select("-password");

        req.user = user;

        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log("Error in protectRoute middleware ", error);
    }
}

export default protectRoute;