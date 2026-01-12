import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../service/api";
import { getUserRole } from "../service/authService";

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userRole = getUserRole();
  const isHR = userRole === "ROLE_HR_MANAGER" || userRole === "HR_MANAGER";

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    employeeId: "",
    designation: "",
    department: "",
    salary: "",
    phone: "",
    address: "",
  });

  // Fetch existing employee
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        let response;
        if (isHR && id) {
          response = await api.get(`/hr/employees/${id}`);
        } else {
          try {
            // For employee self-update
            response = await api.get(`/employees/profile`);
          } catch (err) {
            console.warn(
              "Direct profile fetch failed, trying alternate or by email..."
            );
            throw err;
          }
        }

        // Ensure we don't set null values that break controlled inputs
        const safeData = {
          firstName: response.data.firstName || "",
          lastName: response.data.lastName || "",
          email: response.data.email || "",
          employeeId: response.data.employeeId || "",
          designation: response.data.designation || "",
          department: response.data.department || "",
          salary: response.data.salary || "",
          phone: response.data.phone || "",
          address: response.data.address || "",
          id: response.data.id || response.data._id,
        };
        setFormData(safeData);
      } catch (error) {
        console.error("Failed to fetch employee", error);
        alert("Failed to load employee data. Please try again.");
        navigate(-1);
      }
    };

    fetchEmployee();
  }, [id, navigate, isHR]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isHR && id) {
        await api.put(`/hr/employees/${id}`, formData);
      } else {
        await api.put(`/employees/profile`, formData);
      }
      navigate(-1); // go back
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update employee");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 py-12 px-6 dark:bg-slate-900 flex justify-center">
      <div className="bg-slate-50 shadow-2xl rounded-3xl p-10 max-w-2xl w-full border border-gray-200 dark:bg-slate-700">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Update Employee
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* NAME */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 dark:text-white">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-300"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 dark:text-white">
                Last Name
              </label>
              <input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-300"
                required
              />
            </div>
          </div>

          {/* EMAIL */}
          <div>
            <label className="block font-semibold mb-1 dark:text-white">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                !isHR
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-50 dark:bg-gray-300"
              }`}
              required
              readOnly={!isHR}
            />
          </div>

          {/* EMPLOYEE ID */}
          <div>
            <label className="block font-semibold mb-1 dark:text-white">
              Employee ID
            </label>
            <input
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                !isHR
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-50 dark:bg-gray-300"
              }`}
              required
              readOnly={!isHR}
            />
          </div>

          {/* DEPARTMENT & DESIGNATION */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 dark:text-white">
                Department
              </label>
              <input
                name="department"
                value={formData.department}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  !isHR
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gray-50 dark:bg-gray-300"
                }`}
                required
                readOnly={!isHR}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 dark:text-white">
                Designation
              </label>
              <input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  !isHR
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-gray-50 dark:bg-gray-300"
                }`}
                required
                readOnly={!isHR}
              />
            </div>
          </div>

          {/* SALARY */}
          <div>
            <label className="block font-semibold mb-1 dark:text-white">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg ${
                !isHR
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-50 dark:bg-gray-300"
              }`}
              required
              readOnly={!isHR}
            />
          </div>

          {/* PHONE */}
          <div>
            <label className="block font-semibold mb-1 dark:text-white">
              Phone
            </label>
            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-300"
              required
            />
          </div>

          {/* ADDRESS */}
          <div>
            <label className="block font-semibold mb-1 dark:text-white">
              Address
            </label>
            <textarea
              name="address"
              rows="2"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-300"
              required
            />
          </div>

          {/* ACTIONS */}
          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-1/2 py-2 border rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 dark:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="w-1/2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEmployee;
