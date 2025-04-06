import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail } from "lucide-react";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="w-full max-w-md h-[600px] md:h-[520px] p-8 bg-gray-50 rounded-4xl border border-gray-300 shadow-md">
        <div className="max-w-md mx-auto text-center mt-18">
          <h2 className="text-3xl text-gray-800 font-bold">Forgot Password ?</h2>
          <p className="text-gray-800 mt-2">
            No Worries we will send you reset instructions
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <p className="text-gray-800  text-xl font-semibold">
            How you like?
          </p>

          <div
            onClick={() => setOtpType("phone")}
            className="flex items-center gap-4 rounded cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Phone className="text-gray-600" />
              <span className="font-semibold text-gray-800">Phone :</span>
            </div>
            <div
              className={`w-6 h-6 flex items-center justify-center rounded ${
                otpType === "phone"
                  ? "bg-gray-800 text-white"
                  : "border border-gray-300"
              }`}
            >
              {otpType === "phone" && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>

          <div
            onClick={() => setOtpType("email")}
            className="flex items-center gap-5 rounded cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Mail className="text-gray-600" />
              <span className="font-semibold text-gray-800">Email :</span>
            </div>
            <div
              className={`w-6 h-6 flex items-center justify-center rounded ${
                otpType === "email"
                  ? "bg-gray-800 text-white"
                  : "border border-gray-300"
              }`}
            >
              {otpType === "email" && (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>
          </div>
        </div>

        <button
          className="w-full mt-4 px-3 py-2 bg-gray-800 text-white rounded-xl"
          onClick={handleNext}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
