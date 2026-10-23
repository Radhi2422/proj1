const User = require("../models/User");
const Role = require("../models/Role");
const Permission=require("../models/Permission.js")
const bcrypt=require("bcrypt");
const jwt = require("jsonwebtoken");

const logger = require("../logs/logger");

exports.login=async(req,res,next)=>{
    try{
        const {userId,password}=req.body;
        const user_name=await User.findOne({userId});
        console.log(user_name)
        if(!user_name){
            const error = new Error("User Not registered");
            error.statusCode = 401;
            throw error;
        }
        const isPasswordValid=await bcrypt.compare(
            req.body.password,
            user_name.password
        )
        if(!isPasswordValid){
           const error = new Error("Incorrect Password");
            error.statusCode = 401;
            throw error;
        }
        const token=jwt.sign({id:user_name._id},process.env.JWT_SECRET,{expiresIn:"8h"});
        const roleOfUserLoggedIn=await Role.findOne({
           _id:user_name.role
        });
        const Id=user_name._id;
        logger.info("User logged in successfully", {
            userId: user_name._id,
        });
        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            role:roleOfUserLoggedIn.roleName,
            user_Id:Id
        })
    }catch(error){
        next(error);
    }
}

exports.register = async (req, res,next) => {
    try {

        const { name, email, userId, password } = req.body;
        if (!name || !email || !userId || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required."
            });
        }

        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }
        const existingUser = await User.findOne({ userId });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User ID already exists."
            });
        }
        const userRole = await Role.findOne({ roleName: "User" });

        if (!userRole) {
            return res.status(500).json({
                success: false,
                message: "Default User role not found."
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            userId,
            password: hashedPassword,
            role: userRole._id,
            isActive: true
        });
        logger.info("User created successfully", {
            name: user.name,
        });
        await user.save();

        return res.status(201).json({
            success: true,
            message: "User registered successfully."
        });

    } catch (error) {

        next(error);

    }
};