import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../service/api";
import { getUserRole, getCurrentUser } from "../service/authService";

const MyProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userRole = getUserRole();
  const isHR = userRole === "ROLE_HR_MANAGER" || userRole === "HR_MANAGER";
  const currentUser = getCurrentUser();

  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/employee/profile");
      console.log(response);
      setEmployee(response.data);
      // setFormData(response.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    }
  };

  const handleEdit = () => {
    navigate("/my-profile/edit");
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
      </div>
    </div>
  );
};

export default MyProfile;
