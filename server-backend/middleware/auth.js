const jwt = require("jsonwebtoken")

function auth(req, res, next) {
    try {
        const token = req.cookies.token

        if(!token) return res.status(401).json({errorMessage: "Unauthorized"})

        // Verifing token
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        // Verifing user
        req.user = verified.user;

        next();

    } catch (error) {
        console.log(error);
        res.status(401).json({errorMessage: "Unauthorized"})
    }
}

module.exports = auth;