import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../service/api';

const EmployeesList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const [employees, setEmployees] = useState([]);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/hr/employees");
      console.log(response);
      setEmployees(response.data);
    } catch (error) {
      console.error("Failed to fetch employees", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter logic
  const filteredData = employees?.filter((emp) => {
    const matchesSearch = emp.firstName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const empPerPage = 5;

  const totalPages = Math.ceil(filteredData?.length / empPerPage);

  const indexOfLast = currentPage * empPerPage;
  const indexOfFirst = indexOfLast - empPerPage;
  const currentItems = filteredData?.slice(indexOfFirst, indexOfLast);

  const goToPage = (page) => setCurrentPage(page);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-4 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            Employees
          </h1>
          <p className="mt-1 text-m text-slate-500 dark:text-slate-400">
            Manage and view all Employees Data.
          </p>
        </header>

        <div className="mb-4 flex flex-col gap-3 rounded-xl bg-slate-50 dark:bg-slate-800 px-4 py-4 shadow-sm ring-1 ring-slate-200/70 dark:ring-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-slate-400">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search Employee..."
                className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 pl-9 pr-3 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 shadow-sm focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1); // Reset pagination on search change
                }}
              />
            </div>
          </div>

          <div>
            <button
            onClick={() => navigate("/hr/employee/add")}
              className="block w-full rounded-lg border border-slate-200 dark:border-slate-600 bg-green-600 dark:bg-green-800 px-4 py-2 text-m text-slate-100 dark:text-slate-200 shadow-sm hover:bg-green-700 dark:hover:bg-green-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Add Employee
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm ring-1 ring-slate-200/80 dark:ring-slate-700">
          <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
            <thead className="bg-slate-50 dark:bg-slate-900">
              <tr>
                <th className="px-6 py-3 text-left text-s font-medium uppercase tracking-wider text-slate-500 dark:text-slate-200">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-s font-medium uppercase tracking-wider text-slate-500 dark:text-slate-200">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-s font-medium uppercase tracking-wider text-slate-500 dark:text-slate-200">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-s font-medium uppercase tracking-wider text-slate-500 dark:text-slate-200">
                  Designation
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-700 bg-slate-100 dark:bg-slate-800">
              {currentItems?.length > 0 ? (
                currentItems.map((emp) => (
                  <tr
                    key={emp.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700 transition"
                  >
                    <td className="px-6 py-4 text-m font-medium">
                      <Link
                        to={`/employee/${emp.id}`}
                        className="no-underline text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-slate-100"
                      >
                        {emp.employeeId}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`dark:text-slate-200 px-3 py-1 text-s font-semibold rounded-full`}
                      >
                        {emp.firstName + " "+ emp.lastName}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-200">
                      {emp.email}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-200">
                      {emp.designation}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="py-6 text-center text-slate-500 dark:text-slate-400"
                  >
                    No matching results
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {filteredData?.length > 0 && (
          <div className="mt-6 flex justify-center gap-3">
            <button
              disabled={currentPage === 1}
              onClick={() => goToPage(currentPage - 1)}
              className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-sm font-bold disabled:opacity-40 dark:text-white"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i + 1)}
                className={`px-4 py-2 rounded-lg text-m font-bold dark:text-white ${
                  currentPage === i + 1
                    ? "bg-green-700 text-white"
                    : "bg-slate-200 dark:bg-green-900"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => goToPage(currentPage + 1)}
              className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-500 text-sm font-bold dark:text-white disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeesList;
