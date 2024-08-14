import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(402).json({
                message: "User not authenticated",
                success: false
            })
        }
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decoded) {
            return res.status(402).json({
                message: "Invalid token ",
                success: false
            })
        }

        req.id = decoded.userId;
        next()
    } catch (error) {
        console.log(error)
        return res.status(402).json({
            message: "Not found user token ",
            success: false
        })
    }
}

export default isAuthenticated;