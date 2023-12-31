const sellerAuthTokenCreate = require('./mutations/sellerAuthTokenCreate');
const userAuthRegister = require('./mutations/userAuthRegister');
const userAuthVerifyEmail = require('./mutations/userAuthVerifyEmail');
const sellerAuthProgress = require('./queries/sellerAuthProgress');

const resolvers = {
    Mutation: {
        sellerAuthTokenCreate: sellerAuthTokenCreate,
        sellerAuthVerifyEmail: userAuthVerifyEmail,
        sellerAuthRegister: (parent, args, context) => {
            const argsWithDefaultUserType = { ...args, userType: 'Seller' };
            return userAuthRegister(parent, argsWithDefaultUserType, context);
        },
    },
    Query: {
        sellerAuthProgress: sellerAuthProgress,
    }
};

module.exports = resolvers;
