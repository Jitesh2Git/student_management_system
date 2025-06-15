import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconUserPlus,
  IconX,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../ui/Toaster";
import { signUpUserByAdmin } from "../../store/slices/authSlice";
import { validateCreateUserForm } from "../../lib/validations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateUserModal = ({ refresh }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const creatingUser = useSelector((state) => state.auth.creatingUser);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    studentDetails: {
      firstName: "",
      lastName: "",
      course: "",
      phone: "",
      enrollmentNumber: "",
      admissionDate: null,
      email: "",
    },
  });

  const isFormValid = () => {
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
    } = userData;

    return (
      name.trim() &&
      email.trim() &&
      password.trim() &&
      firstName.trim() &&
      lastName.trim() &&
      course.trim() &&
      phone.trim() &&
      enrollmentNumber.trim() &&
      admissionDate &&
      studentEmail.trim()
    );
  };

  const handleChange = (field, value, nested = false) => {
    if (nested) {
      setUserData((prev) => ({
        ...prev,
        studentDetails: {
          ...prev.studentDetails,
          [field]: value,
        },
      }));
    } else {
      setUserData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setUserData({
      name: "",
      email: "",
      password: "",
      studentDetails: {
        firstName: "",
        lastName: "",
        course: "",
        phone: "",
        enrollmentNumber: "",
        admissionDate: "",
        email: "",
      },
    });
  };

  const handleCreate = async () => {
    const errorMessage = validateCreateUserForm(userData);
    if (errorMessage) {
      showToast({ type: "error", message: errorMessage });
      return;
    }

    const resultAction = await dispatch(signUpUserByAdmin(userData));

    if (signUpUserByAdmin.fulfilled.match(resultAction)) {
      showToast({ type: "success", message: "User created successfully!" });
      refresh();
      setUserData({
        name: "",
        email: "",
        password: "",
        studentDetails: {
          firstName: "",
          lastName: "",
          course: "",
          phone: "",
          enrollmentNumber: "",
          admissionDate: "",
          email: "",
        },
      });
    } else {
      showToast({
        type: "error",
        message: resultAction.payload || "Failed to create user",
      });
    }
  };

  return (
    <>
      <Button
        variant="custom"
        onClick={() => setIsOpen(true)}
        className="rounded-none flex items-center gap-2 w-fit hover:bg-custom-primary
        hover:text-custom-primary-content"
      >
        <IconUserPlus size={16} />
        Create User
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-black/50 animate-in fade-in-0 duration-200" />

          <div
            className="bg-background fixed z-50 grid w-full max-w-[calc(100%-2rem)] sm:max-w-lg translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] border p-6 shadow-lg rounded-lg animate-in fade-in-0 zoom-in-95
             max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              disabled={creatingUser}
              className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
            >
              <IconX className="w-4 h-4" />
              <span className="sr-only">Close</span>
            </button>

            <div className="flex flex-col gap-2 text-left mb-4">
              <h2 className="text-lg font-semibold leading-none">
                Create New User
              </h2>
              <p className="text-sm text-muted-foreground">
                Fill in the details below to create a new user account.
              </p>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium text-base">Login Credentials</h3>
                <Input
                  placeholder="Name"
                  value={userData.name}
                  required
                  className="text-sm"
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <Input
                  placeholder="Email"
                  className="text-sm"
                  value={userData.email}
                  required
                  onChange={(e) => handleChange("email", e.target.value)}
                />
                <div className="relative">
                  <Input
                    placeholder="Password"
                    className="text-sm"
                    required
                    type={showPassword ? "text" : "password"}
                    value={userData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground cursor-pointer"
                  >
                    {showPassword ? (
                      <IconEyeOff size={18} />
                    ) : (
                      <IconEye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <hr className="my-2" />

              <div className="space-y-2">
                <h3 className="font-medium text-base">Student Details</h3>
                <Input
                  placeholder="First Name"
                  className="text-sm"
                  required
                  value={userData.studentDetails.firstName}
                  onChange={(e) =>
                    handleChange("firstName", e.target.value, true)
                  }
                />
                <Input
                  placeholder="Last Name"
                  className="text-sm"
                  required
                  value={userData.studentDetails.lastName}
                  onChange={(e) =>
                    handleChange("lastName", e.target.value, true)
                  }
                />
                <Input
                  placeholder="Course"
                  className="text-sm"
                  required
                  value={userData.studentDetails.course}
                  onChange={(e) => handleChange("course", e.target.value, true)}
                />
                <Input
                  placeholder="Student Email"
                  className="text-sm"
                  required
                  value={userData.studentDetails.email}
                  onChange={(e) => handleChange("email", e.target.value, true)}
                />

                <div className="flex gap-2 items-center">
                  <span className="text-sm text-muted-foreground">+91</span>
                  <Input
                    placeholder="Phone (10 digits)"
                    required
                    value={userData.studentDetails.phone.replace(
                      /^\+91\s*/,
                      ""
                    )}
                    onChange={(e) =>
                      handleChange("phone", `+91 ${e.target.value}`, true)
                    }
                    maxLength={10}
                    className="flex-1 text-sm"
                  />
                </div>

                <Input
                  placeholder="Enrollment Number (e.g. IN-2025-001)"
                  className="text-sm"
                  required
                  value={userData.studentDetails.enrollmentNumber}
                  onChange={(e) =>
                    handleChange("enrollmentNumber", e.target.value, true)
                  }
                />

                <DatePicker
                  selected={
                    userData.studentDetails.admissionDate
                      ? new Date(userData.studentDetails.admissionDate)
                      : null
                  }
                  onChange={(date) => handleChange("admissionDate", date, true)}
                  maxDate={new Date()}
                  placeholderText="Select Admission Date"
                  showYearDropdown
                  dateFormat="yyyy-MM-dd"
                  wrapperClassName="w-full"
                  className="w-full text-sm px-3 py-2 border rounded-md bg-neutral-100"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button
                variant="outline"
                disabled={creatingUser}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                variant="custom"
                className="w-fit rounded-md bg-custom-secondary-dark text-custom-secondary-content"
                disabled={!isFormValid() || creatingUser}
                onClick={handleCreate}
              >
                {creatingUser ? (
                  <>
                    <IconLoader2 className="h-4 w-4 animate-spin" />
                    <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                        Creating
                      </span>
                      <span
                        className="absolute left-0 top-0 block translate-y-full 
                          transition-transform duration-300 group-hover:translate-y-0"
                      >
                        Creating
                      </span>
                    </span>
                  </>
                ) : (
                  <span className="relative overflow-hidden">
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                      Create
                    </span>
                    <span
                      className="absolute left-0 top-0 block translate-y-full 
                      transition-transform duration-300 group-hover:translate-y-0"
                    >
                      Create
                    </span>
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUserModal;
