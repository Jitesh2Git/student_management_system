import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "motion/react";
import { twMerge } from "tailwind-merge";

const Header = ({ role }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={twMerge(
        "sticky top-0 bg-custom-foreground flex items-center justify-between py-2 px-4 sm:px-10 min-h-[70px] z-50",
        !isOpen && "border"
      )}
    >
      <Link to="/" className="flex items-center gap-2 font-medium text-xl">
        <img src="/logo.png" alt="Logo Image" className="w-auto h-8" />
        EduPanel
      </Link>

      <div className="hidden sm:flex items-center space-x-6">
        {role ? (
          <Link
            to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
            className="group inline-flex flex-col items-center justify-center bg-custom-primary 
          px-5 py-2 rounded hover:bg-custom-secondary-dark font-medium text-base
          text-custom-primary-content hover:text-custom-secondary-content"
          >
            <span className="relative overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                Dashboard
              </span>
              <span
                className="absolute left-0 top-0 block translate-y-full 
              transition-transform duration-300 group-hover:translate-y-0"
              >
                Dashboard
              </span>
            </span>
          </Link>
        ) : (
          <>
            <Link
              to="/sign-in"
              className="px-6 py-2 font-medium whitespace-nowrap text-base"
            >
              Sign in
              <span className="text-xs text-gray-500 block">User & Admin</span>
            </Link>

            <Link
              to="/sign-up"
              className="group inline-flex flex-col items-center justify-center bg-custom-primary 
          px-5 py-2 rounded hover:bg-custom-secondary-dark font-medium text-base
          text-custom-primary-content hover:text-custom-secondary-content"
            >
              <span className="relative overflow-hidden">
                <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                  Admin Sign up
                </span>
                <span
                  className="absolute left-0 top-0 block translate-y-full 
              transition-transform duration-300 group-hover:translate-y-0"
                >
                  Admin Sign up
                </span>
              </span>
            </Link>
          </>
        )}
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="square"
        strokeLinejoin="round"
        className="block sm:hidden cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <line
          x1="3"
          y1="6"
          x2="21"
          y2="6"
          className={twMerge(
            "origin-left transition",
            isOpen && "rotate-45 -translate-y-1"
          )}
        />
        <line
          x1="3"
          y1="12"
          x2="21"
          y2="12"
          className={twMerge("transition", isOpen && "opacity-0")}
        />
        <line
          x1="3"
          y1="18"
          x2="21"
          y2="18"
          className={twMerge(
            "origin-left transition",
            isOpen && "-rotate-45 translate-y-1"
          )}
        />
      </svg>

      <AnimatePresence>
        {isOpen && (
          <Motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-full sm:hidden overflow-hidden z-40
          bg-gray-50 text-base font-medium shadow"
          >
            <div className="flex flex-col items-center py-4 space-y-4 text-center">
              {role ? (
                <Link
                  to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                  className={twMerge(
                    `group inline-flex flex-col items-center justify-center bg-custom-primary w-1/2 
                  px-5 py-2 rounded text-base font-medium text-custom-primary-content`,
                    location.pathname == "/sign-up" &&
                      "bg-custom-secondary-dark text-custom-secondary-content"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="relative overflow-hidden">
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                      Dashboard
                    </span>
                    <span
                      className="absolute left-0 top-0 block translate-y-full 
                     transition-transform duration-300 group-hover:translate-y-0"
                    >
                      Dashboard
                    </span>
                  </span>
                </Link>
              ) : (
                <>
                  <Link
                    to="/sign-in"
                    className={twMerge(
                      `group inline-flex flex-col items-center justify-center bg-custom-primary w-1/2 
                  px-5 py-2 rounded text-base font-medium text-custom-primary-content`,
                      location.pathname == "/sign-in" &&
                        "bg-custom-secondary-dark text-custom-secondary-content"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    Sign in
                    <span className="text-xs opacity-80">User & Admin</span>
                  </Link>
                  <Link
                    to="/sign-up"
                    className={twMerge(
                      `group inline-flex flex-col items-center justify-center bg-custom-primary w-1/2 
                  px-5 py-2 rounded text-base font-medium text-custom-primary-content`,
                      location.pathname == "/sign-up" &&
                        "bg-custom-secondary-dark text-custom-secondary-content"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                        Admin Sign up
                      </span>
                      <span
                        className="absolute left-0 top-0 block translate-y-full 
                     transition-transform duration-300 group-hover:translate-y-0"
                      >
                        Admin Sign up
                      </span>
                    </span>
                  </Link>
                </>
              )}
            </div>
          </Motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
