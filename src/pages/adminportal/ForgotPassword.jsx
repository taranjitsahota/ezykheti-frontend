import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { Loader } from "lucide-react";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const [otpType, setOtpType] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!otpType) {
      alert("Please select an OTP type.");
      return;
    }
    setLoading(true);
    navigate(`/send-otp?type=${otpType}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="w-full max-w-md h-[500px] md:h-[500px] p-4 px-12 rounded-4xl border border-gray-300">
        <div className="max-w-md w-full mx-auto text-center mt-16">
          <h2 className="text-3xl text-[#222222] font-bold">
            Forgot Password ?
          </h2>
          <p className="text-[#222222]">
            No Worries we will send you reset instructions.
          </p>
        </div>

        <div className="mt-10 space-y-4">
          <p className="text-[#222222]  text-xl font-semibold">How you like?</p>

          <div
            onClick={() => setOtpType("phone")}
            className="flex items-center gap-4 rounded cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Phone className="text-[#222222]" />
              <span className="font-semibold text-[#222222]">Phone :</span>
            </div>
            <div
              className={`w-6 h-6 flex items-center justify-center rounded ${
                otpType === "phone"
                  ? "bg-[#222222] text-white"
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
            className="flex items-center gap-5.5 rounded cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Mail className="text-[#222222]" />
              <span className="font-semibold text-[#222222]">Email :</span>
            </div>
            <div
              className={`w-6 h-6 flex items-center justify-center rounded ${
                otpType === "email"
                  ? "bg-[#222222] text-white"
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
          className="w-full cursor-pointer mt-12 px-3 py-2 bg-[#222222] text-white rounded-xl"
          onClick={handleNext}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="animate-spin" size={18} />
              Submitting...
            </div>
          ) : (
            "Submiit"
          )}
        </button>
        <div
          className=" flex justify-center mt-4 text-center text-md text-gray-600 cursor-pointer hover:text-[#222222] flex items-center"
          onClick={() => navigate("/admin")}
        >
          <span className="mr-1">←</span> Back to Login
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
