import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const verifyJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        if(!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({
                response: "error",
                message: "Unauthorized: No token provided or malformed header"
            })
        }

        const token = authHeader.split(' ')[1];

        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            async (err, decoded) => {
                if(err) {
                    if(err.name === 'TokenExpiredError') {
                        return res.status(403).json({
                            code: "TOKEN_EXPIRED"
                        })
                    }
                    return res.status(403).json({
                        response: "error",
                        message: "Forbidden: Invalid token"
                    })
                }
                const user = await User.findById(decoded.id).select("-password -refreshToken");
                if(!user) {
                    return res.status(401).json({
                        response: "error",
                        message: "Unauthorized: User not found"
                    })
                }
                req.user = user;
                next();
            }
        );
    } catch (error) {
        console.log("Unauthorization error: ", error);
        return res.status(401).json({
            response: "error",
            message: "Unauthorized"
        })
    }
}

export default verifyJWT;