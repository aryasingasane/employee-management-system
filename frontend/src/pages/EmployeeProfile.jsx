import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../service/api";
import { getUserRole, getCurrentUser } from "../service/authService";

const EmployeeProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userRole = getUserRole();
  const isHR = userRole === "ROLE_HR_MANAGER" || userRole === "HR_MANAGER";
  const currentUser = getCurrentUser();
  const isDeleting = useRef(false);

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (!currentUser?.sub) {
      navigate("/login");
      return;
    }

    const fetchEmployee = async () => {
        // Guard against race conditions during deletion
      if (isDeleting.current) return;
      try {
        const role = getUserRole();
        const isHR = role === "ROLE_HR_MANAGER" || role === "HR_MANAGER";

        let employeeId = id;

        // EMPLOYEE → own profile
        if (!employeeId && !isHR) {

          const profileRes = await api.get(`/employees/profile`);
          console.log(profileRes);
          setEmployee(profileRes.data);
          return;
        }

        // HR → any profile
        if (isHR) {
          if (!employeeId) {
            const res = await api.get("/hr/employees");

            const matchedEmp = res.data.find(
              (emp) => emp.email === currentUser.sub
            );

            if (!matchedEmp) {
              throw new Error("HR employee record not found");
            }

            employeeId = matchedEmp.id;
          }

          const profileRes = await api.get(`/hr/employees/${employeeId}`);
          setEmployee(profileRes.data);
          return;
        }

        // Employee trying to access someone else
        alert("Unauthorized access");
        navigate(-1);
      } catch (err) {
        if (isDeleting.current) return;
        console.error(err);
        alert("Unable to load profile");
        navigate(-1);
      }
    };

    fetchEmployee();
  }, [id, currentUser, navigate]);

  const handleEdit = () => {
    navigate(`/hr/employee/edit/${employee.id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this employee?"))
      return;
    
    isDeleting.current = true;
    try {
      await api.delete(`/hr/employees/${id}`);
      navigate("/hr-dashboard"); // change if your list route differs
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete employee");
    }
  };

  if (!employee) return null;

  const InfoRow = ({ label, value }) => (
    <div className="grid grid-cols-3 gap-6 py-3 border-b border-slate-200 dark:border-slate-700">
      <span className="text-slate-500 dark:text-slate-400 font-medium">
        {label}
      </span>
      <span className="col-span-2 text-slate-800 dark:text-slate-200">
        {value || "-"}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">
            {employee.firstName} {employee.lastName}
          </h1>

          <div className="flex gap-3">
            <button
              onClick={handleEdit}
              className="rounded-lg bg-yellow-400 px-4 py-2 text-m font-semibold text-black hover:bg-yellow-500"
            >
              Edit Data
            </button>
            {isHR && (
              <button
                onClick={handleDelete}
                className="rounded-lg bg-red-500 px-4 py-2 text-m font-semibold text-white hover:bg-red-600"
              >
                Delete Employee
              </button>
            )}
          </div>
        </div>

        {/* PROFILE CARD */}
        <div className="rounded-xl bg-slate-50 dark:bg-slate-800 shadow-sm ring-1 ring-slate-200/80 dark:ring-slate-700 p-6">
          <InfoRow label="Employee ID" value={employee.employeeId} />
          <InfoRow label="First Name" value={employee.firstName} />
          <InfoRow label="Last Name" value={employee.lastName} />
          <InfoRow label="Email" value={employee.email} />
          <InfoRow label="Department" value={employee.department} />
          <InfoRow label="Designation" value={employee.designation} />
          <InfoRow label="Salary" value={`₹ ${employee.salary}`} />
          <InfoRow label="Phone" value={employee.phone} />
          <InfoRow label="Address" value={employee.address} />
        </div>

        {/* BACK */}
        {isHR && (
          <div className="mt-6">
            <button
              onClick={() => navigate(-1)}
              className="text-m font-medium text-green-600 hover:underline"
            >
              ← Back to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeProfile;
