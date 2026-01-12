import React from "react";
import { Link } from "react-router-dom";
import { getUserRole } from "../service/authService";

const Sidebar = () => {
  const userRole = getUserRole();
  const isHR = userRole === "ROLE_HR_MANAGER" ||
  userRole === "HR_MANAGER";
  return (
    <>
      <aside className="h-screen w-54 bg-green-900  dark:bg-slate-800 text-slate-100 flex flex-col py-6">
        <nav className="flex flex-col gap-2 px-2">
          {isHR && (
          <Link
            to="/hr-dashboard"
            className="no-underline w-60  hover:bg-green-800"
          >
            <button className="flex items-center gap-3 px-4 py-3 text-sm rounded-xl text-slate-200 transition">
              <span className="text-lg"></span>
              <span className="text-lg">Dashboard</span>
            </button>
          </Link>)}

          <Link to={isHR ? "/profile" : "/my-profile"} className="no-underline w-60  hover:bg-green-800">
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-200 transition">
              <span className="text-lg"></span>
              <span className="text-lg">My Profile</span>
            </button>
          </Link>

          <Link
            to="/settings"
            className="no-underline w-60  hover:bg-green-800"
          >
            <button className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-slate-200 transition ">
              <span className="text-lg"></span>
              <span className="text-lg">Settings</span>
            </button>
          </Link>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
