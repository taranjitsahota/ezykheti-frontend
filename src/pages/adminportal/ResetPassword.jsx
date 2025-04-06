import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../config/api";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const contact = queryParams.get("contact");

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/reset-password`, {
                type: "forgot_password",
                contact,
                password,
            });
            alert("Password reset successful.");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Password reset failed.");
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Reset Password</h2>

                <input
                    type="password"
                    className="w-full px-3 py-2 border rounded mt-3"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <input
                    type="password"
                    className="w-full px-3 py-2 border rounded mt-3"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <button
                    className="w-full mt-4 px-3 py-2 bg-blue-500 text-white rounded"
                    onClick={handleResetPassword}
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset Password"}
                </button>
            </div>
        </div>
    );
};

export default ResetPassword;
