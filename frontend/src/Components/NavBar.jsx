import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../service/api";
import { logout, getCurrentUser } from "../service/authService";

const NavBar = () => {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUser();
    console.log(user);
    setCurrentUser(user.sub);
    console.log(currentUser);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="w-full h-16 bg-slate-200 dark:bg-slate-800 border-b dark:border-slate-700 flex items-center justify-between px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-9 rounded-xl bg-green-600 dark:bg-green-500 text-white flex items-center justify-center text-sm font-semibold">
          HMS
        </div>
        <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          HR Management System
        </span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-base font-medium text-lg text-slate-800 dark:text-slate-200">
          {/* <i class="fa-regular fa-circle-user"></i> */} Hello,
          </span>
          <span className="text-base font-medium text-lg text-slate-800 dark:text-slate-200">
          {currentUser}
        </span>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-m font-medium text-slate-100 dark:text-slate-200 border border-slate-300 dark:border-slate-600 rounded-lg bg-green-600 hover:bg-green-700  dark:bg-green-800 dark:hover:bg-green-900 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default NavBar;
