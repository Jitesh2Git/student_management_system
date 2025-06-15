import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAdmin } from "../../store/slices/adminSlice";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { showToast } from "@/components/ui/Toaster";
import { IconEye, IconEyeOff, IconLoader2, IconX } from "@tabler/icons-react";
import {
  validateAccountForm,
  validatePasswordChangeForm,
} from "../../lib/validations";

const SettingsModal = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("account");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const updating = useSelector((state) => state.admin.updating);
  const [initialAccountData, setInitialAccountData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    currentPassword: "",
  });

  useEffect(() => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      password: "",
      currentPassword: "",
    });
  }, [user]);

  useEffect(() => {
    const name = user?.name || "";
    const email = user?.email || "";
    setFormData({
      name,
      email,
      password: "",
      currentPassword: "",
    });
    setInitialAccountData({ name, email });
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAccountUpdate = async () => {
    const errorMessage = validateAccountForm({
      name: formData.name,
      email: formData.email,
    });
    if (errorMessage) {
      showToast({ type: "error", message: errorMessage });
      return;
    }

    const updateData = {
      name: formData.name,
      email: formData.email,
    };

    const resultAction = await dispatch(
      updateAdmin({ userId: user._id, userData: updateData })
    );

    if (updateAdmin.fulfilled.match(resultAction)) {
      showToast({ type: "success", message: "Account updated successfully!" });
    } else {
      showToast({
        type: "error",
        message: resultAction.payload || "Account update failed",
      });
    }
  };

  const handlePasswordUpdate = async () => {
    const errorMessage = validatePasswordChangeForm({
      currentPassword: formData.currentPassword,
      newpassword: formData.password,
    });
    if (errorMessage) {
      showToast({ type: "error", message: errorMessage });
      return;
    }

    const updateData = {
      password: formData.password,
      currentPassword: formData.currentPassword,
    };

    const resultAction = await dispatch(
      updateAdmin({ userId: user._id, userData: updateData })
    );

    if (updateAdmin.fulfilled.match(resultAction)) {
      showToast({ type: "success", message: "Password updated successfully!" });
      setFormData((prev) => ({
        ...prev,
        password: "",
        currentPassword: "",
      }));
    } else {
      showToast({
        type: "error",
        message: resultAction.payload || "Password update failed",
      });
    }
  };

  const handleSubmit = () => {
    if (activeTab === "account") {
      handleAccountUpdate();
    } else {
      handlePasswordUpdate();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50 animate-in fade-in-0 duration-200" />

      <div
        className="bg-background fixed z-50 w-full max-w-lg translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] border p-6 shadow-lg rounded-lg animate-in fade-in-0 zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          disabled={updating}
          className="absolute top-4 right-4 opacity-70 hover:opacity-100 transition-opacity cursor-pointer"
        >
          <IconX className="w-4 h-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="mb-4 border-b pb-4">
          <div className="flex gap-4 mb-2">
            <Button
              variant={activeTab === "account" ? "" : "outline"}
              onClick={() => setActiveTab("account")}
              className="w-fit rounded-md bg-custom-primary hover:bg-custom-primary"
            >
              Account
            </Button>
            <Button
              variant={activeTab === "password" ? "" : "outline"}
              onClick={() => setActiveTab("password")}
              className="w-fit rounded-md bg-custom-primary hover:bg-custom-primary"
            >
              Password
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-2">
            {activeTab === "account"
              ? "Make changes to your account here. Click save when you're done."
              : "Change your password here. Click save when you're done."}
          </p>
        </div>

        {activeTab === "account" ? (
          <div className="flex flex-col gap-4">
            <Input
              label="Name"
              name="name"
              required
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              className="text-sm"
            />
            <Input
              label="Email"
              name="email"
              required
              type="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              className="text-sm"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Input
                label="Current Password"
                name="currentPassword"
                required
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter current password"
                value={formData.currentPassword}
                onChange={handleChange}
                className="text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showCurrentPassword ? (
                  <IconEyeOff size={18} />
                ) : (
                  <IconEye size={18} />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                label="New Password"
                name="password"
                required
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                className="text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showNewPassword ? (
                  <IconEyeOff size={18} />
                ) : (
                  <IconEye size={18} />
                )}
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-end mt-6 gap-2">
          <Button variant="outline" onClick={onClose} disabled={updating}>
            Cancel
          </Button>
          <Button
            variant="custom"
            className="w-fit rounded-md bg-custom-secondary-dark text-custom-secondary-content"
            onClick={handleSubmit}
            disabled={
              updating ||
              (activeTab === "account" &&
                formData.name === initialAccountData.name &&
                formData.email === initialAccountData.email) ||
              (activeTab === "password" &&
                (!formData.password || !formData.currentPassword))
            }
          >
            {updating ? (
              <>
                <IconLoader2 className="h-4 w-4 animate-spin" />
                <span className="relative overflow-hidden">
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                    Saving
                  </span>
                  <span
                    className="absolute left-0 top-0 block translate-y-full 
                          transition-transform duration-300 group-hover:translate-y-0"
                  >
                    Saving
                  </span>
                </span>
              </>
            ) : (
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  Save Changes
                </span>
                <span
                  className="absolute left-0 top-0 block translate-y-full 
                      transition-transform duration-300 group-hover:translate-y-0"
                >
                  Save Changes
                </span>
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
