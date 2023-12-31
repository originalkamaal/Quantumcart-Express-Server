const User = require('../../../../models/User');
const Seller = require('../../../../models/Seller');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const yup = require('yup');
const EmailVerification = require('../../../../models/EmailVerification');
const generateAuthToken = require('../../../../utils/generate_token');

const validationSchema = yup.object().shape({
  email: yup.string().email().required(),
  phone: yup.string().matches(/^\d{12}$/, 'Phone number must be 10 digits').required(),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(32, 'Password must be at most 32 characters')
    .matches(/^(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least 1 capital letter and 1 number')
    .required(),
  name: yup.string().required(),
  whatsAppMarketing: yup.boolean().required(),
  userType: yup.string().oneOf(['Seller', 'Customer', 'Employee', 'Admin', 'Vendor']).required(),
});

const registerUser = async (_, args, context) => {
  try {
    await validationSchema.validate(args, { abortEarly: false });

    const existingUser = await User.findOne({
      $or: [{ email: args.email }, { phone: args.phone }],
    });

    if (existingUser) {
      if (existingUser.email === args.email) {
        return { success: false, message: 'Email is already in use. Please use a different email.' };
      } else {
        return { success: false, message: 'Phone number is already in use. Please use a different phone number.' };
      }
    }

    const hashedPassword = await bcrypt.hash(args.password, 10);

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(20).toString('hex');

    const newUser = await User.create({
      name: args.name,
      email: args.email,
      phone: args.phone,
      password: hashedPassword,
      whatsAppMarketing: args.whatsAppMarketing,
      userType: args.userType,
      phoneVerified: true
    });

    // Create EmailVerification entry
    await EmailVerification.create({
      user: newUser._id,
      token: emailVerificationToken,
    });

    if (args.userType === 'Seller') {
      await Seller.create({
        userId: newUser._id,
        // Add other fields specific to Seller
      });
    }


    // If passwords match, generate and set the token in the response header
    const token = await generateAuthToken({ user: newUser });

    context.res.header('Authorization', `Bearer ${token}`);

    return { success: true, message: 'User registered successfully' };
  } catch (error) {
    if (error.name === 'ValidationError') {
      const firstValidationError = error.inner[0];
      return { success: false, message: firstValidationError.message };
    } else {
      return { success: false, message: 'An error occurred during registration. Please try again later.' };
    }
  }
};

module.exports = registerUser;
