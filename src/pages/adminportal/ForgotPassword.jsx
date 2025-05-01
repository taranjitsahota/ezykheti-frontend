import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { Loader } from "lucide-react";
import AuthLayout from "../../layouts/AuthLayout";
import { toast } from "react-toastify";


const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const [otpType, setOtpType] = useState(null);
  const navigate = useNavigate();

  const handleNext = () => {
    if (!otpType) {
      toast.error("Please select an OTP type.");

      return;
    }
    setLoading(true);
    navigate(`/send-otp?type=${otpType}`);
  };

  return (
    <AuthLayout title="Forgot Password ?" subtitle="No Worries we'll send you reset instructions.">
        <div className="mt-10 space-y-4">
          <p className="text-xl font-semibold">How you like?</p>

          <div
            onClick={() => setOtpType("phone")}
            className="flex items-center gap-4 rounded cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Phone className="" />
              <span className="font-semibold">Phone :</span>
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
              <Mail className="" />
              <span className="font-semibold">Email :</span>
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
          className="btn-submit w-full cursor-pointer mt-12"
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
          className=" flex justify-center mt-4 text-center text-md text-gray-600 cursor-pointer hover:text-[#417505] flex items-center"
          onClick={() => navigate("/admin")}
        >
          <span className="mr-1">←</span> Back to Login
        </div>
      
    </AuthLayout>
  );
};

export default ForgotPassword;
