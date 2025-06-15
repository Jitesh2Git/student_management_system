import mongoose from "mongoose";
import User from "../models/user.model.js";
import Student from "../models/student.model.js";

export const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id).select("-password");
    if (!user) throw new Error("User not found");

    const student = await Student.findOne({ user: id });

    res.status(200).json({
      success: true,
      data: {
        user,
        student,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;
    const { name, student } = req.body;

    const updates = {};
    const studentUpdates = {};

    if (name) updates.name = name;

    if (student) {
      const { firstName, lastName, phone } = student;
      if (firstName) studentUpdates.firstName = firstName;
      if (lastName) studentUpdates.lastName = lastName;
      if (phone) studentUpdates.phone = phone;
    }

    let updatedUser = null;
    let updatedStudent = null;

    if (Object.keys(updates).length > 0) {
      updatedUser = await User.findByIdAndUpdate(id, updates, {
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
      message: "User updated successfully",
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
