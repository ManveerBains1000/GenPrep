

const verifyJWT = (req, res, next) => {
    try{
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized",
            });
        }

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        
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
        res.status(500).json({
            message: "Internal server error",
        });
        next(error);
    }
}


export default verifyJWT;