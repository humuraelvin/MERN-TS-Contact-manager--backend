import express, { request } from "express";
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (
  request: express.Request,
  response: express.Response
) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    if (!firstName || !lastName || !email || !password) {
      return response
        .status(401)
        .json({ message: "All fields are required please" });
    }

    const newEmail = email.toLowerCase();
    const emailExists = await User.findOne({ email: newEmail });

    if (emailExists) {
      return response
        .status(401)
        .json({ message: "Email trying to be registered already exists" });
    }

    if (password.trim().length < 6) {
      return response
        .status(401)
        .json({ message: "Password should be atleast 6 characters please" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName,
      lastName,
      email: newEmail,
      password: hashedPassword,
    });

    return response.status(200).json({
      success: true,
      message: "User created and saved successfully",
      newUser,
    });
  } catch (error) {
    console.log(error);
    
    return response
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const loginUser = async (
  request: express.Request,
  response: express.Response
) => {
  
    try {
        const { email, password } = request.body;

        if (!email || !password) {
          return response
            .status(400)
            .json({ message: "All fields are required to be field please" });
        }

        const enteredEmail = email.toLowerCase();

        const user = await User.findOne({ email: enteredEmail });
        if (!user) {
          return response.status(400).json({ message: "User not found" });
        }

        const checkingUserPassword = await bcrypt.compare(
          password,
          user.password
        );


        if (!user || !checkingUserPassword) {
          return response.status(400).json({ message: "Invalid credentials" });
        }

        const { _id: id, firstName } = user;
        const token = jwt.sign({ id, firstName }, process.env.JWT_SECRET, {
          expiresIn: "1d",
        });

        return response
          .status(200)
          .json({ message: "Logged in successfully", token, id, firstName });
    } catch (error) {
        console.log(error);
        
        return response.status(500).json({message:"Internal server error"});

    }


};


export default {registerUser, loginUser};
