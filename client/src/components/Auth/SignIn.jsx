import {
  IconEye,
  IconEyeOff,
  IconLoader2,
  IconLogin2,
} from "@tabler/icons-react";
import { motion as Motion } from "motion/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn as signInThunk } from "../../store/slices/authSlice";
import { showToast } from "../ui/Toaster";
import { validateSignInForm } from "../../lib/validations";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const loading = useSelector((state) => state.auth.loading);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    const errorMessage = validateSignInForm(email);
    if (errorMessage) {
      showToast({ type: "error", message: errorMessage });
      return;
    }

    const resultAction = await dispatch(signInThunk({ email, password }));

    if (signInThunk.fulfilled.match(resultAction)) {
      const { role } = resultAction.payload;
      showToast({
        type: "success",
        message: "Logged in successfully!",
      });

      setFormData({
        email: "",
        password: "",
      });

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } else {
      showToast({
        type: "error",
        message: resultAction.payload || "Failed to sign in",
      });
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-10">
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
                <IconLogin2 className="bg-indigo-100 text-custom-primary rounded-full p-3 size-14" />
              </div>
              <h4 className="font-semibold text-xl text-gray-800">
                Sign In to Your Account
              </h4>
              <p className="text-gray-600">
                Enter your credentials to continue
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mb-4 space-y-4">
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
                  placeholder="Enter your email"
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
                    placeholder="Enter your password"
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

              <div className="pt-2">
                <Button type="submit" variant="custom" disabled={loading}>
                  {loading ? (
                    <>
                      <IconLoader2 className="h-4 w-4 animate-spin" />
                      <span className="relative overflow-hidden">
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                          Signing in
                        </span>
                        <span
                          className="absolute left-0 top-0 block translate-y-full 
                          transition-transform duration-300 group-hover:translate-y-0"
                        >
                          Signing in
                        </span>
                      </span>
                    </>
                  ) : (
                    <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                        Sign in
                      </span>
                      <span
                        className="absolute left-0 top-0 block translate-y-full 
                      transition-transform duration-300 group-hover:translate-y-0"
                      >
                        Sign in
                      </span>
                    </span>
                  )}
                </Button>
              </div>
            </form>

            <div className="text-center space-y-3">
              <p className="text-xs text-gray-600">
                Don't have login credentials?{" "}
                <span className="text-custom-copy-light font-medium">
                  Contact administrator
                </span>
              </p>
            </div>
          </div>
        </Motion.div>
      </div>
    </div>
  );
};

export default SignIn;
