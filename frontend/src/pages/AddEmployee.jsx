import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

const AddEmployee = () => {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/hr/employees", formData);
      navigate(-1); // go back to dashboard or previous page
    } catch (error) {
      console.error("Failed to add employee", error);
      alert("Failed to add employee");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-6 dark:bg-slate-900 flex justify-center">
      <div className="bg-slate-50 shadow-2xl rounded-3xl p-10 max-w-2xl w-full border border-gray-200 dark:bg-slate-800">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Add Employee
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
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-300"
              required
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
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-300"
              required
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
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-300"
                required
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
                className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-300"
                required
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
              className="w-full px-4 py-2 border rounded-lg bg-gray-50 dark:bg-gray-300"
              required
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
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
