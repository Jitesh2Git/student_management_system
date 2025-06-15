import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { IconLoader2, IconX } from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../ui/Toaster";
import { updateUserByAdmin } from "../../store/slices/adminSlice";
import { validateEditUserForm } from "../../lib/validations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UserEditModal = ({ user, onCancel }) => {
  const dispatch = useDispatch();
  const updating = useSelector((state) => state.admin.updating);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    student: {
      firstName: "",
      lastName: "",
      course: "",
      phone: "",
      enrollmentNumber: "",
      admissionDate: null,
      email: "",
    },
  });

  useEffect(() => {
    if (user) {
      setUserData({
        name: user.name || "",
        email: user.email || "",
        student: {
          firstName: user.student?.firstName || "",
          lastName: user.student?.lastName || "",
          course: user.student?.course || "",
          phone: user.student?.phone || "",
          enrollmentNumber: user.student?.enrollmentNumber || "",
          admissionDate: user.student?.admissionDate
            ? new Date(user.student.admissionDate)
            : null,
          email: user.student?.email || "",
        },
      });
    }
  }, [user]);

  const isFormValid = () => {
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
    } = userData;

    return (
      name.trim() &&
      email.trim() &&
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
        student: {
          ...prev.student,
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
    onCancel();
  };

  const handleUpdate = async () => {
    const errorMessage = validateEditUserForm(userData);
    if (errorMessage) {
      showToast({ type: "error", message: errorMessage });
      return;
    }

    const resultAction = await dispatch(
      updateUserByAdmin({ userId: user._id, data: userData })
    );

    if (updateUserByAdmin.fulfilled.match(resultAction)) {
      showToast({ type: "success", message: "User updated successfully!" });
    } else {
      showToast({
        type: "error",
        message: resultAction.payload || "Failed to update user",
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 animate-in fade-in-0 duration-200" />

      <div
        className="bg-background fixed z-50 grid w-full max-w-[calc(100%-2rem)] sm:max-w-lg translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] border p-6 shadow-lg rounded-lg animate-in fade-in-0 zoom-in-95
         max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          disabled={updating}
          className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <IconX className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="flex flex-col gap-2 text-left mb-4">
          <h2 className="text-lg font-semibold leading-none">Edit User</h2>
          <p className="text-sm text-muted-foreground">
            Update the user details below.
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
          </div>

          <hr className="my-2" />

          <div className="space-y-2">
            <h3 className="font-medium text-base">Student Details</h3>
            <Input
              placeholder="First Name"
              className="text-sm"
              required
              value={userData.student.firstName}
              onChange={(e) => handleChange("firstName", e.target.value, true)}
            />
            <Input
              placeholder="Last Name"
              className="text-sm"
              required
              value={userData.student.lastName}
              onChange={(e) => handleChange("lastName", e.target.value, true)}
            />
            <Input
              placeholder="Course"
              className="text-sm"
              required
              value={userData.student.course}
              onChange={(e) => handleChange("course", e.target.value, true)}
            />
            <Input
              placeholder="Student Email"
              className="text-sm"
              required
              value={userData.student.email}
              onChange={(e) => handleChange("email", e.target.value, true)}
            />

            <div className="flex gap-2 items-center">
              <span className="text-sm text-muted-foreground">+91</span>
              <Input
                placeholder="Phone (10 digits)"
                required
                value={userData.student.phone.replace(/^\+91\s*/, "")}
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
              value={userData.student.enrollmentNumber}
              onChange={(e) =>
                handleChange("enrollmentNumber", e.target.value, true)
              }
            />

            <DatePicker
              selected={userData.student.admissionDate}
              onChange={(date) => handleChange("admissionDate", date, true)}
              maxDate={new Date()}
              placeholderText="Select Admission Date"
              showYearDropdown
              dateFormat="yyyy-MM-dd"
              wrapperClassName="w-full"
              className="w-full text-sm px-3 py-2 border rounded-md bg-neutral-100 focus:outline-none focus:ring-0 focus:border-gray-300"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" disabled={updating} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="custom"
            className="w-fit rounded-md bg-custom-secondary-dark text-custom-secondary-content"
            disabled={!isFormValid() || updating}
            onClick={handleUpdate}
          >
            {updating ? (
              <>
                <IconLoader2 className="h-4 w-4 animate-spin" />
                <span className="relative overflow-hidden">
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                    Updating
                  </span>
                  <span
                    className="absolute left-0 top-0 block translate-y-full 
                      transition-transform duration-300 group-hover:translate-y-0"
                  >
                    Updating
                  </span>
                </span>
              </>
            ) : (
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  Update
                </span>
                <span
                  className="absolute left-0 top-0 block translate-y-full 
                  transition-transform duration-300 group-hover:translate-y-0"
                >
                  Update
                </span>
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserEditModal;
