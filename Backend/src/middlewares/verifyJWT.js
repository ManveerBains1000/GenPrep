import jwt from "jsonwebtoken";
import { Blacklist } from "../models/blacklist.model.js";
const verifyJWT = async (req, res, next) => {
    try{
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const isTokenBlacklisted = await Blacklist.findOne({ token });

        if (isTokenBlacklisted) {
            return res.status(401).json({
                message: "Token is invalidated. Please login again.",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        req.user = decoded;

        next();
    }
    catch(error){
        console.error(error);
        res.status(401).json({
            message: "Invalid token",
        });
        next(error);
    }
}


export default verifyJWT;