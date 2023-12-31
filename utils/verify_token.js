// context.js
const jwt = require('jsonwebtoken');

const verifyToken = async ({ req, res }) => {
    let token = null;
    let isTokenInvalid = true;
    let isTokenExpired = true;
    // Extract token from the Authorization header

    res.header('Access-Control-Expose-Headers', '*');
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader) {
        token = authorizationHeader.replace('Bearer ', '');

        try {
            // Verify the token and get its payload
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
            // console.log("decodedToken : " + JSON.stringify(decodedToken));
            // Token is valid
            isTokenInvalid = false;

            // Check if the token is expired
            const expirationTimeWithGracePeriod = decodedToken.exp * 1000 - (5 * 60 * 1000); // 5 minutes grace period
            isTokenExpired = expirationTimeWithGracePeriod < Date.now();
        } catch (error) {
            isTokenInvalid = true;
            console.error('Token verification failed:', error);
        }
    }

    return {
        req,
        res,
        token,
        isTokenInvalid,
        isTokenExpired,
    };
};

module.exports = verifyToken;