export const validateAdminSignUpForm = ({ name, email, password, secret }) => {
  if (!name.trim()) {
    return "Name is required";
  }

  if (name.length < 2 || name.length > 50) {
    return "Name must be between 2 and 50 characters";
  }

  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Enter a valid email address";
  }

  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;
  if (!passwordRegex.test(password)) {
    return "Password must include at least one uppercase, lowercase, number, and special character";
  }

  if (!secret) {
    return "Admin secret is required";
  }

  if (secret.length < 6) {
    return "Enter full secret code";
  }

  return null;
};

export const validateSignInForm = (email) => {
  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Enter a valid email address";
  }

  return null;
};

export const validateUserEditForm = ({ name, firstName, lastName, phone }) => {
  if (!name.trim()) {
    return "Name is required";
  }
  if (name.length < 2 || name.length > 50) {
    return "Name must be between 2 and 50 characters";
  }

  if (!firstName.trim()) {
    return "First name is required";
  }
  if (firstName.length < 2 || firstName.length > 50) {
    return "First name must be between 2 and 50 characters";
  }

  if (!lastName.trim()) {
    return "Last name is required";
  }
  if (lastName.length < 2 || lastName.length > 50) {
    return "Last name must be between 2 and 50 characters";
  }

  if (!phone.trim()) {
    return "Phone number is required";
  }

  const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/;
  if (!phoneRegex.test(phone)) {
    return "Enter a valid Indian phone number";
  }

  return null;
};

export const validatePasswordChangeForm = ({
  currentPassword,
  newpassword,
}) => {
  if (!currentPassword) {
    return "Current Password is required";
  }

  if (!newpassword) {
    return "New Password is required";
  }

  if (newpassword.length < 6) {
    return "Password must be at least 6 characters long";
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;
  if (!passwordRegex.test(newpassword)) {
    return "Password must include at least one uppercase, lowercase, number, and special character";
  }

  return null;
};

export const validateAccountForm = ({ name, email }) => {
  if (!name.trim()) {
    return "Name is required";
  }

  if (name.length < 2 || name.length > 50) {
    return "Name must be between 2 and 50 characters";
  }

  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Enter a valid email address";
  }

  return null;
};

export const validateCreateUserForm = (data) => {
  const {
    name,
    email,
    password,
    studentDetails: {
      firstName,
      lastName,
      course,
      phone,
      enrollmentNumber,
      admissionDate,
      email: studentEmail,
    },
  } = data;

  if (!name.trim()) {
    return "Name is required";
  }

  if (name.length < 2 || name.length > 50) {
    return "Name must be between 2 and 50 characters";
  }

  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Enter a valid email address";
  }

  if (!password) {
    return "Password is required";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long";
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;
  if (!passwordRegex.test(password)) {
    return "Password must include at least one uppercase, lowercase, number, and special character";
  }

  if (!firstName.trim()) {
    return "Name is required";
  }

  if (firstName.length < 2 || firstName.length > 50) {
    return "FirstName must be between 2 and 50 characters";
  }

  if (!lastName.trim()) {
    return "Name is required";
  }

  if (lastName.length < 2 || lastName.length > 50) {
    return "FirstName must be between 2 and 50 characters";
  }

  if (!studentEmail.trim()) {
    return "Student email is required";
  }

  if (email !== studentEmail) {
    return "Login email and student email must be the same.";
  }

  const studentEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!studentEmailRegex.test(studentEmail)) {
    return "Enter a valid email address";
  }

  if (!course) return "Course is required.";

  if (!phone) return "Phone number is required.";

  const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/;
  if (!phoneRegex.test(phone))
    return "Please provide a valid Indian phone number.";

  if (!enrollmentNumber) return "Enrollment number is required.";

  const enrollmentRegex = /^[A-Z]{1,5}-\d{1,4}-\d{1,4}$/;
  if (!enrollmentRegex.test(enrollmentNumber))
    return "Enrollment number format is invalid (e.g., IN-2025-001).";

  if (!admissionDate) return "Admission date is required.";

  return null;
};

export const validateEditUserForm = (data) => {
  const {
    name,
    email,
    student: {
      firstName,
      lastName,
      course,
      phone,
      enrollmentNumber,
      admissionDate,
      email: studentEmail,
    },
  } = data;

  if (!name.trim()) {
    return "Name is required";
  }

  if (name.length < 2 || name.length > 50) {
    return "Name must be between 2 and 50 characters";
  }

  if (!email.trim()) {
    return "Email is required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Enter a valid email address";
  }

  if (!firstName.trim()) {
    return "Name is required";
  }

  if (firstName.length < 2 || firstName.length > 50) {
    return "FirstName must be between 2 and 50 characters";
  }

  if (!lastName.trim()) {
    return "Name is required";
  }

  if (lastName.length < 2 || lastName.length > 50) {
    return "FirstName must be between 2 and 50 characters";
  }

  if (!studentEmail.trim()) {
    return "Student email is required";
  }

  if (email !== studentEmail) {
    return "Login email and student email must be the same.";
  }

  const studentEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!studentEmailRegex.test(studentEmail)) {
    return "Enter a valid email address";
  }

  if (!course) return "Course is required.";

  if (!phone) return "Phone number is required.";

  const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/;
  if (!phoneRegex.test(phone))
    return "Please provide a valid Indian phone number.";

  if (!enrollmentNumber) return "Enrollment number is required.";

  const enrollmentRegex = /^[A-Z]{1,5}-\d{1,4}-\d{1,4}$/;
  if (!enrollmentRegex.test(enrollmentNumber))
    return "Enrollment number format is invalid (e.g., IN-2025-001).";

  if (!admissionDate) return "Admission date is required.";

  return null;
};
