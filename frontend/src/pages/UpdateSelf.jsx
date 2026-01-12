import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

const UpdateSelf = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        // Include other fields to display them as read-only if needed
        employeeId: "",
        designation: "",
        department: "",
        salary: ""
    });
    const [loading, setLoading] = useState(true);

    // Fetch existing profile
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/employee/profile"); // Confirmed endpoint
                // Ensure data exists
                const data = response.data || {};

                setFormData({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    email: data.email || "",
                    phone: data.phone || "",
                    address: data.address || "",
                    employeeId: data.employeeId || "",
                    designation: data.designation || "",
                    department: data.department || "",
                    salary: data.salary || ""
                });
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch profile", error);
                alert("Failed to load profile data.");
                navigate(-1);
            }
        };

        fetchProfile();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Confirmed endpoint
            await api.put("/employee/profile", formData);
            navigate(-1); // Go back to profile
        } catch (error) {
            console.error("Update failed", error);
            alert("Failed to update profile");
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-6 dark:bg-slate-900 flex justify-center">
            <div className="bg-slate-50 shadow-2xl rounded-3xl p-10 max-w-2xl w-full border border-gray-200 dark:bg-slate-800">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                    Edit My Profile
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

                    {/* READ-ONLY FIELDS */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-1 dark:text-white">Email</label>
                            <input
                                name="email"
                                value={formData.email}
                                disabled
                                className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed text-gray-600"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1 dark:text-white">Employee ID</label>
                            <input
                                name="employeeId"
                                value={formData.employeeId}
                                disabled
                                className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed text-gray-600"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block font-semibold mb-1 dark:text-white">Department</label>
                            <input
                                name="department"
                                value={formData.department}
                                disabled
                                className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed text-gray-600"
                            />
                        </div>
                        <div>
                            <label className="block font-semibold mb-1 dark:text-white">Designation</label>
                            <input
                                name="designation"
                                value={formData.designation}
                                disabled
                                className="w-full px-4 py-2 border rounded-lg bg-gray-200 cursor-not-allowed text-gray-600"
                            />
                        </div>
                    </div>

                    {/* EDITABLE FIELDS */}
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

export default UpdateSelf;
