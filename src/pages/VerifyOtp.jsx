import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../config/api";

const VerifyOTP = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    
    const otpType = queryParams.get("type") || "login"; // Default to login
    const contact = queryParams.get("contact") || "";

    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const storedUserId = localStorage.getItem("user_id");
        if (!storedUserId) {
            navigate("/"); // Redirect if no user_id
        }
        setUserId(storedUserId);
    }, [navigate]);

    const handleVerifyOTP = async () => {
        if (!otp) {
            alert("Please enter the OTP.");
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/verify-otp`, { 
                user_id: userId, 
                otp, 
                type: otpType 
            });

            alert("OTP Verified Successfully!");

            if (otpType === "forgot_password") {
                navigate(`/reset-password?type=forgot_password&contact=${contact}`);
            } else {
                localStorage.setItem("auth_token", response.data.token);
                localStorage.setItem("login_time", new Date().getTime());
                navigate("/dashboard");
            }
        } catch (error) {
            alert(error.response?.data?.error || "OTP verification failed.");
        }finally {
            setLoading(false); // Move setLoading inside finally to ensure it's reset
        }
        
    };

    const handleResendOTP = async (contactType) => {
        try {
            await axios.post(`${API_BASE_URL}/resend-otp`, { 
                user_id: userId, 
                contact_type: contactType 
            });

            alert("OTP resent successfully!");
        } catch (error) {
            alert(error.response?.data?.message || "Error resending OTP.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
                <p className="text-center text-gray-600 mt-2">Enter the OTP sent to {contact}</p>

                <input
                    type="text"
                    className="w-full px-3 py-2 border rounded mt-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <button
                    className="w-full mt-4 px-3 py-2 bg-blue-500 text-white rounded"
                    onClick={handleVerifyOTP}
                    disabled={loading}
                >
                    {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button 
                    onClick={() => handleResendOTP("email")} 
                    className="w-full mt-2 px-3 py-2 bg-gray-500 text-white rounded"
                >
                    Resend OTP via Email
                </button>

                <button 
                    onClick={() => handleResendOTP("phone")} 
                    className="w-full mt-2 px-3 py-2 bg-gray-500 text-white rounded"
                >
                    Resend OTP via Phone
                </button>
            </div>
        </div>
    );
};

export default VerifyOTP;
