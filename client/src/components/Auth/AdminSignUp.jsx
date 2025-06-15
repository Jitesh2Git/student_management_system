import { useState } from "react";
import {
  IconEye,
  IconEyeOff,
  IconKey,
  IconLoader2,
  IconShieldCheckFilled,
} from "@tabler/icons-react";
import { OTPInput } from "@/components/ui/OTPInput";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";
import { motion as Motion } from "motion/react";
import { showToast } from "../ui/Toaster";
import { validateAdminSignUpForm } from "../../lib/validations";
import { useDispatch, useSelector } from "react-redux";
import { signUp as signUpThunk } from "../../store/slices/authSlice";

const AdminSignUp = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    secret: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOTPChange = (otpValue) => {
    setFormData((prev) => ({
      ...prev,
      secret: otpValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, secret } = formData;

    const errorMessage = validateAdminSignUpForm({
      name,
      email,
      password,
      secret,
    });
    if (errorMessage) {
      showToast({ type: "error", message: errorMessage });
      return;
    }

    const resultAction = await dispatch(
      signUpThunk({ name, email, password, secret })
    );

    if (signUpThunk.fulfilled.match(resultAction)) {
      showToast({
        type: "success",
        message: "Account created successfully!",
      });

      setFormData({
        name: "",
        email: "",
        password: "",
        secret: "",
      });
    } else {
      showToast({
        type: "error",
        message: resultAction.payload || "Failed to sign up",
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-30">
      <div className="relative max-sm:w-full">
        <div className="hidden sm:block h-40 w-40 text-indigo-300 absolute -z-10 -left-10 -top-10">
          <svg
            id="patternId"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="b"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="scale(0.5) rotate(0)"
              >
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  strokeWidth="1"
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="800%"
              height="800%"
              transform="translate(0,0)"
              fill="url(#b)"
            />
          </svg>
        </div>
        <div className="hidden sm:block h-40 w-40 text-indigo-300 absolute -z-10 -right-10 -bottom-10">
          <svg
            id="patternId"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="b"
                patternUnits="userSpaceOnUse"
                width="40"
                height="40"
                patternTransform="scale(0.5) rotate(0)"
              >
                <rect x="0" y="0" width="100%" height="100%" fill="none" />
                <path
                  d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
                  strokeWidth="1"
                  stroke="none"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              width="800%"
              height="800%"
              transform="translate(0,0)"
              fill="url(#b)"
            />
          </svg>
        </div>

        <Motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative flex flex-col sm:w-[32rem] rounded-lg border border-custom-border bg-white shadow-lg"
        >
          <div className="flex-auto p-6">
            <div className="mb-8 text-center space-y-3">
              <div className="flex items-center justify-center mb-3">
                <IconShieldCheckFilled className="bg-indigo-100 text-custom-primary rounded-full p-3 size-14" />
              </div>
              <h4 className="font-semibold text-xl text-gray-800">
                Admin Registration
              </h4>
              <p className="text-gray-600">
                Create your administrator account for EduPanel
              </p>
              <div
                className="flex items-center justify-center gap-2 text-sm text-amber-700 bg-amber-50 px-3 py-2 
              rounded-md"
              >
                <IconKey className="size-5" />
                <span className="font-medium">Admin Access Only</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mb-4 space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your admin email"
                  className="text-sm"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    className="text-sm"
                    required
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-custom-copy-lighter"
                  >
                    {showPassword ? (
                      <IconEyeOff className="size-5" />
                    ) : (
                      <IconEye className="size-5" />
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Admin Secret Code
                </label>
                <p className="text-xs text-gray-500 mb-3">
                  Enter the 6-digit administrative access code
                </p>
                <div className="flex justify-center">
                  <OTPInput
                    value={formData.secret}
                    onChange={handleOTPChange}
                    length={6}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="custom" disabled={loading}>
                  {loading ? (
                    <>
                      <IconLoader2 className="h-4 w-4 animate-spin" />
                      <span className="relative overflow-hidden">
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                          Creating Account
                        </span>
                        <span
                          className="absolute left-0 top-0 block translate-y-full 
                          transition-transform duration-300 group-hover:translate-y-0"
                        >
                          Creating Account
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                        Create Account
                      </span>
                      <span
                        className="absolute left-0 top-0 block translate-y-full 
                      transition-transform duration-300 group-hover:translate-y-0"
                      >
                        Create Account
                      </span>
                    </span>
                  )}
                </Button>
              </div>
            </form>

            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                Already have an admin account?{" "}
                <Link
                  to="/sign-in"
                  className="text-indigo-500 hover:underline font-medium cursor-pointer"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default AdminSignUp;
