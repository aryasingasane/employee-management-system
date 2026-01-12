import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50 dark:bg-slate-800">
    <h1 className="text-7xl font-bold text-red-500 dark:text-red-400">404</h1>
    <p className="text-gray-500 dark:text-gray-200 mt-2 mb-8">
      Oops! Page doesn’t exist.
    </p>
    <Link
      to="/dashboard"
      className=" no-underline px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Go HOME
    </Link>
  </div>
);

export default NotFound;
