const validateTokenMiddleware = require('../../../middlewares/validateToken');

const sellerAuthProgress = async (_, { sellerId }, context) => {
  
    return {
        responseStatus: {
            success: true,
            message: 'Authorized',
        },
        progress: "Nukkkkk", // or whatever progress value you want to return
    };
};

module.exports = validateTokenMiddleware(sellerAuthProgress);
