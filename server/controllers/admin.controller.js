import mongoose from "mongoose";
import User from "../models/user.model.js";
import Student from "../models/student.model.js";
import bcrypt from "bcryptjs";

export const getAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Admin data fetched successfully",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

export const updateAdmin = async (req, res, next) => {
  try {
    const { name, email, password, currentPassword } = req.body;

    const user = await User.findById(req.params.id);

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    if (password) {
      if (!currentPassword) {
        return res.status(400).json({
          success: false,
          message: "Current password is required to change password",
        });
      }

      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      user.password = password;
    }

    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    const updatedUser = user.toObject();
    delete updatedUser.password;

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAdmin = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ role: "user" })
      .sort({ createdAt: -1 })
      .select("-password")
      .lean();

    const studentDetails = await Student.find({
      user: { $in: users.map((u) => u._id) },
    }).lean();

    const userMap = users.map((user) => {
      const student = studentDetails.find(
        (stu) => stu.user.toString() === user._id.toString()
      );
      return {
        ...user,
        student,
      };
    });

    res.status(200).json({
      success: true,
      count: userMap.length,
      data: userMap,
    });
  } catch (err) {
    next(err);
  }
};

export const updateUserByAdmin = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const { name, email, student } = req.body;

    const userUpdates = {};
    const studentUpdates = {};

    if (name) userUpdates.name = name;
    if (email) userUpdates.email = email;

    if (student) {
      const {
        firstName,
        lastName,
        email: studentEmail,
        phone,
        course,
        enrollmentNumber,
        admissionDate,
      } = student;

      if (firstName) studentUpdates.firstName = firstName;
      if (lastName) studentUpdates.lastName = lastName;
      if (studentEmail) studentUpdates.email = studentEmail;
      if (phone) studentUpdates.phone = phone;
      if (course) studentUpdates.course = course;
      if (enrollmentNumber) studentUpdates.enrollmentNumber = enrollmentNumber;
      if (admissionDate) studentUpdates.admissionDate = admissionDate;
    }

    let updatedUser = null;
    let updatedStudent = null;

    if (Object.keys(userUpdates).length > 0) {
      updatedUser = await User.findByIdAndUpdate(id, userUpdates, {
        new: true,
        session,
        runValidators: true,
      }).select("-password");
    }

    if (Object.keys(studentUpdates).length > 0) {
      updatedStudent = await Student.findOneAndUpdate(
        { user: id },
        studentUpdates,
        {
          new: true,
          session,
          runValidators: true,
        }
      );
    }

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "User updated successfully by admin",
      data: {
        user: updatedUser,
        student: updatedStudent,
      },
    });
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    next(err);
  }
};

export const deleteUserByAdmin = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
