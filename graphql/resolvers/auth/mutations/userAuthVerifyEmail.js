const User = require('../../../../models/User');
const EmailVerification = require('../../../../models/EmailVerification');

const userAuthVerifyEmail = async (_, { uid, token }, context) => {
  try {
    // Find the user in the EmailVerification collection
    const emailVerificationEntry = await EmailVerification.findOne({ user: uid, token });

    if (!emailVerificationEntry) {
      // Token doesn't match or user not found
      return { responseStatus: { success: false, message: 'Invalid verification token or user not found' } };
    }

    // Token matches, delete the entry from EmailVerification collection
    await EmailVerification.findByIdAndDelete(emailVerificationEntry._id);

    // Mark email as verified in the User collection
    await User.findByIdAndUpdate(uid, { emailVerified: true });

    return { responseStatus: { success: true, message: 'Email verification successful' } };
  } catch (error) {
    console.error(error);
    return { responseStatus: { success: false, message: 'An error occurred during email verification' } };
  }
};

module.exports = userAuthVerifyEmail;
