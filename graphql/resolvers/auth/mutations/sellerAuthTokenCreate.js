const generateAuthToken = require("../../../../utils/generate_token");
const User = require('../../../../models/User');
const bcrypt = require('bcrypt');
const yup = require('yup');

const validationSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const loginUser = async (_, { email, password }, context) => {
    try {
        await validationSchema.validate({ email, password }, { abortEarly: false });

        // Retrieve the user from the database
        const user = await User.findOne({ email });
        // console.log(context);
        if (user) {
            // Compare the provided password with the hashed password in the database
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                // If passwords match, generate and set the token in the response header
                const token = await generateAuthToken(user);

                context.res.header('Authorization', `Bearer ${token}`);

                return { success: true, message: 'Logged in successfully' };
            } else {
                return { success: false, message: 'Authentication failed' };
            }
        } else {
            return { success: false, message: 'User not found' };
        }
    } catch (error) {
        console.error(error);
        if (error.name === 'ValidationError') {
            const firstValidationError = error.inner[0];
            return { success: false, message: firstValidationError.message };
        }
        return { success: false, message: 'An error occurred during login' };
    }
};

module.exports = loginUser;
