import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="grid min-h-screen place-items-center px-4">
      <div className="text-center">
        <p className="text-lg font-semibold text-custom-primary">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="bg-white mt-6 flex items-center justify-center">
          <Link
            to="/"
            className="group inline-flex items-center justify-center bg-custom-primary
            px-5 py-2 rounded text-base hover:bg-custom-secondary-dark font-medium
            text-custom-primary-content hover:text-custom-secondary-content"
          >
            <span className="relative overflow-hidden">
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                Back to home
              </span>
              <span
                className="absolute left-0 top-0 block translate-y-full
              transition-transform duration-300 group-hover:translate-y-0"
              >
                Back to home
              </span>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
