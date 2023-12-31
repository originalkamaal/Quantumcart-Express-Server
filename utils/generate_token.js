const jwt = require('jsonwebtoken');
const Seller = require('../models/Seller');

const generateAuthToken = async (user) => {
  try {

    const tokenPayload = {
      userId: user.id,
      username: user.email,
      userType: user.userType,
    };

    // If userType is Seller, fetch additional details from the Seller collection
    if (user.userType === 'Seller') {
      const sellerDetails = await Seller.findOne({ userId: user.id });
      if (sellerDetails) {
        tokenPayload.displayName = sellerDetails.displayName;
        // Add other details specific to Seller
      }
    }

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET, // Replace with a secure secret key for signing the token
      {
        expiresIn: '15d', // Token expiration time: 15 days
      }
    );

    return token;
  } catch (error) {
    // Handle the error appropriately
    console.error('Error generating token:', error);
    throw error; // Propagate the error up to the calling function
  }
};

module.exports = generateAuthToken;
