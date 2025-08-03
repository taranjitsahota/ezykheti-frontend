import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/apiService";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import AuthLayout from "../../layouts/AuthLayout";
import { Phone, Mail } from "lucide-react";
import { countryCodes } from "../../data/countryCodes";

const SendOTP = () => {
  const [selectedCode, setSelectedCode] = useState("91"); // default India
  const [contact, setContact] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const otpType = new URLSearchParams(location.search).get("type");

  const finalContact =
    otpType === "email" ? contact : `${selectedCode}${contact}`;

  const handleSendOTP = async () => {
    if (!contact) {
      toast.error(`Please enter your ${otpType}.`);
      return;
    }
    setLoading(true);
    try {
      const response = await apiRequest({
        url: "/send-otp",
        method: "post",
        data: {
          contact_type: otpType,
          contact: finalContact,
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
    <AuthLayout
      title="Verify Your Identity"
      subtitle={
        <>
          Enter your registered{" "}
          {otpType === "email" ? "Email" : "Mobile Number"} to <br /> receive
          the OTP.
        </>
      }
    >
      <div className="w-full relative">
        {/* Icon Inside Input */}
        <div className="mt-15">
          <div className="absolute mt-15 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {otpType === "email" && (
              <div className="absolute mt-15 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* <Mail className="w-5 h-5 text-gray-400" /> */}
              </div>
            )}
          </div>
        </div>

        {/* Input with Left Padding */}
        {otpType === "email" ? (
          <>
            <div className="absolute mt-15 inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="email"
              className="w-full pl-10 pr-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your email"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </>
        ) : (
          <div className="flex gap-2">
            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
              className="border border-gray-400 rounded px-2 py-2 focus:outline-none"
            >
              {countryCodes.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
            <input
              type="tel"
              className="flex-1 pl-3 pr-4 py-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter your phone"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
        )}
      </div>

      <button
        className="btn-submit w-full mt-15 px-3 py-2 rounded-xl cursor-pointer"
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
      <div
        className=" flex justify-center mt-4 text-center text-md text-gray-600 cursor-pointer hover:text-[#417505] flex items-center"
        onClick={() => navigate("/forgot-password")}
      >
        <span className="mr-1">←</span> Go Back
      </div>
    </AuthLayout>
  );
};

export default SendOTP;
