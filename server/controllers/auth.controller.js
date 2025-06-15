import mongoose from "mongoose";
import User from "../models/user.model.js";
import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ADMIN_SECRET_CODE,
} from "../config/env.js";

export const verifyToken = async (req, res) => {
  try {
    const token = req.cookies.studentmanager_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    res.status(200).json({
      success: true,
      message: "Token is valid",
      data: {
        userId: decoded.userId,
        role: decoded.role,
      },
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password, secret } = req.body;

    if (!secret) {
      const error = new Error("Admin secret is required");
      error.statusCode = 403;
      throw error;
    } else if (secret !== ADMIN_SECRET_CODE) {
      const error = new Error("Invalid admin secret");
      error.statusCode = 403;
      throw error;
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const newUsers = await User.create([{ name, email, password }], {
      session,
    });

    const user = newUsers[0].toObject();
    delete user.password;

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { user },
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

export const signUpUserByAdmin = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password, studentDetails } = req.body;

    if (studentDetails.email && studentDetails.email !== email) {
      throw new Error("Student email must match user email");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("User already exists");
    }

    const [newUser] = await User.create(
      [{ name, email, password, role: "user" }],
      { session }
    );

    const newStudent = await Student.create(
      [{ ...studentDetails, user: newUser._id }],
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        user: { id: newUser._id, name: newUser.name, email: newUser.email },
        student: newStudent[0],
      },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const user = existingUser.toObject();
    delete user.password;

    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res
      .cookie("studentmanager_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1000 * 60 * 60 * 24,
      })
      .status(200)
      .json({
        success: true,
        message: "User signed in successfully",
        data: { user },
      });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("studentmanager_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      success: true,
      message: "User signed out successfully",
    });
  } catch (error) {
    next(error);
  }
};
