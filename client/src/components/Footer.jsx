import { Link } from "react-router-dom";

const Footer = ({ role }) => {
  return (
    <footer className="bg-custom-foreground border-t border-custom-border py-10 px-10 tracking-wide mt-10">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex flex-wrap items-center sm:justify-between max-sm:flex-col gap-6">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2 font-medium text-xl"
            >
              <img src="/logo.png" alt="Logo Image" className="w-auto h-8" />
              EduPanel
            </Link>
          </div>

          <ul
            className="flex items-center justify-center flex-wrap gap-y-2 md:justify-end space-x-6
          text-custom-copy-light font-medium"
          >
            <li>
              <Link to="/" className="hover:text-custom-primary">
                Home
              </Link>
            </li>

            {role ? (
              <li>
                <Link
                  to={role === "admin" ? "/admin/dashboard" : "/user/dashboard"}
                  className="hover:text-custom-primary"
                >
                  Dashboard
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/sign-in" className="hover:text-custom-primary">
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/sign-up" className="hover:text-custom-primary">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        <hr className="my-6 border-1 border-custom-border" />

        <p className="text-center text-custom-copy-light text-base font-medium">
          © EduPanel. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
