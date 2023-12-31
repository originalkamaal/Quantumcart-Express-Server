// validateTokenMiddleware.js
const validateTokenMiddleware = (resolver) => {
    return async (_, args, context) => {
        const { isTokenInvalid, isTokenExpired } = context;
        if (isTokenInvalid) {
            return {
                responseStatus: {
                    success: false,
                    message: 'You are not authorized. Please login to continue.',
                },
                data: null,
            };
        }

        if (isTokenExpired) {
            return {
                responseStatus: {
                    success: false,
                    message: 'Your session has expired. Please login again to continue.',
                },
                data: null,
            };
        }

        // Call the original resolver function
        return resolver(_, args, context);
    };
};

module.exports = validateTokenMiddleware;
