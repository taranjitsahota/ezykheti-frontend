import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/apiService";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";


const SendOTP = () => {
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const otpType = new URLSearchParams(location.search).get("type");

  const handleSendOTP = async () => {
    if (!contact) {
      toast.error(`Please enter your ${otpType}.`);
      return;
    }
    setLoading(true);
    try {
      const response = await apiRequest({
        url: '/send-otp',
        method: 'post',
        data: {
          contact_type: otpType,
          contact: contact,
        },
      });
  
      if (response.success) {
        const userId = response.data.user_id;
        localStorage.setItem("user_id", userId);
        toast.success(response.message || "OTP sent successfully.");
        navigate(`/verify-otp?type=forgot_password&contact=${contact}`);
      } else {
        toast.error(response.message || "Failed to send OTP.");
      }
    } catch (error) {
      toast.error(error.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen ">
      <div className="w-96 p-6  rounded-lg border border-gray-400">
        <h2 className="text-2xl font-bold text-center">Send OTP</h2>
        <p className="text-center text-gray-600 mt-2">
          Enter your {otpType === "email" ? "Email" : "Phone Number"}
        </p>

        <input
          type={otpType === "email" ? "email" : "text"}
          className="w-full px-3 py-2 border rounded mt-3"
          placeholder={
            otpType === "email" ? "Enter your email" : "Enter your phone"
          }
          contact={contact}
          onChange={(e) => setContact(e.target.value)}
        />

        <button
          className="w-full mt-4 px-3 py-2 bg-[#222222] rounded-xl cursor-pointer text-white rounded"
          onClick={handleSendOTP}
          disabled={loading}
        >
          {/* {loading ? "Sending OTP..." : "Send OTP"} */}
          {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader className="animate-spin" size={18} />
                      Sending OTP...
                    </div>
                  ) : (
                    "Send OTP"
                  )}
        </button>
      </div>
    </div>
  );
};

export default SendOTP;
