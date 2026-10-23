const User = require("../models/User");

const registerValidation = async (req, res, next) => {
    try {

        const { name, email, userId, password } = req.body;

        // Required Fields
        if (!name || !email || !userId || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format."
            });
        }

        // Password Strength
        // Minimum 8 characters
        // At least one uppercase
        // At least one lowercase
        // At least one number
        // At least one special character

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 8 characters and contain uppercase, lowercase, number and special character."
            });
        }

        // Email Exists
        const emailExists = await User.findOne({ email });

        if (emailExists) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        // UserID Exists
        const userExists = await User.findOne({ userId });

        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "User ID already exists."
            });
        }

        next();

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Validation failed."
        });

    }
};

module.exports = registerValidation;

/**
 *         ▼
Validate Required Fields
        │
        ▼
Validate Email Format
        │
        ▼
Validate Password Strength
        │
        ▼
Check Email Exists?
      │        │
     Yes      No
      │        │
 Return 409    ▼
        Check UserID Exists?
             │       │
            Yes     No
             │       │
      Return 409     ▼

 */