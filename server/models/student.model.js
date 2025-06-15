import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters"],
      maxlength: [50, "First name can be at most 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters"],
      maxlength: [50, "Last name can be at most 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Student email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
        "Please provide a valid email address",
      ],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [
        /^(\+91[\s\-]?)?[6-9]\d{9}$/,
        "Please provide a valid Indian phone number",
      ],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      trim: true,
    },
    enrollmentNumber: {
      type: String,
      required: [true, "Enrollment number is required"],
      unique: true,
      trim: true,
      match: [
        /^[A-Z]{1,5}-\d{1,4}-\d{1,4}$/,
        "Enrollment number format is invalid",
      ],
    },
    admissionDate: {
      type: Date,
      required: [true, "Admission date is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
