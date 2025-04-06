import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../../config/api";

const SendOTP = () => {
    const [contact, setContact] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const otpType = new URLSearchParams(location.search).get("type");

    const handleSendOTP = async () => {
        if (!contact) {
            alert(`Please enter your ${otpType}.`);
            return;
        }
        setLoading(true);
        try {
            await axios.post(`${API_BASE_URL}/send-otp`, { contact_type: otpType, contact: contact });
            navigate(`/verify-otp?type=${otpType}&contact=${contact}`);
        } catch (error) {
            alert(error.response?.data?.message || "Failed to send OTP.");
        }
        setLoading(false);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Send OTP</h2>
                <p className="text-center text-gray-600 mt-2">
                    Enter your {otpType === "email" ? "Email" : "Phone Number"}
                </p>

                <input
                    type={otpType === "email" ? "email" : "text"}
                    className="w-full px-3 py-2 border rounded mt-3"
                    placeholder={otpType === "email" ? "Enter your email" : "Enter your phone"}
                    contact={contact}
                    onChange={(e) => setContact(e.target.value)}
                />

                <button
                    className="w-full mt-4 px-3 py-2 bg-blue-500 text-white rounded"
                    onClick={handleSendOTP}
                    disabled={loading}
                >
                    {loading ? "Sending OTP..." : "Send OTP"}
                </button>
            </div>
        </div>
    );
};

export default SendOTP;
