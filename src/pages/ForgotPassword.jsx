import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [otpType, setOtpType] = useState(null);
    const navigate = useNavigate();

    const handleNext = () => {
        if (!otpType) {
            alert("Please select an OTP type.");
            return;
        }
        navigate(`/send-otp?type=${otpType}`);
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-96 p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
                <p className="text-center text-gray-600 mt-2">Choose OTP method</p>

                <div className="mt-4">
                    <button
                        className={`w-full px-3 py-2 border rounded mt-2 ${
                            otpType === "email" ? "bg-blue-500 text-white" : ""
                        }`}
                        onClick={() => setOtpType("email")}
                    >
                        Email OTP
                    </button>
                    <button
                        className={`w-full px-3 py-2 border rounded mt-2 ${
                            otpType === "phone" ? "bg-blue-500 text-white" : ""
                        }`}
                        onClick={() => setOtpType("phone")}
                    >
                        Phone OTP
                    </button>
                </div>

                <button
                    className="w-full mt-4 px-3 py-2 bg-blue-500 text-white rounded"
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ForgotPassword;
