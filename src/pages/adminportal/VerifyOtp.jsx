import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/apiService";
import { FaMobileAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const otpType = queryParams.get("type") || "login";
  const contact = queryParams.get("contact") || "";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (!storedUserId) {
      navigate("/admin");
    }
    setUserId(storedUserId);
  }, [navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]{0,1}$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        // Go to previous input if current is empty
        if (index > 0) {
          const prevInput = document.getElementById(`otp-${index - 1}`);
          prevInput?.focus();

          const updatedOtp = [...otp];
          updatedOtp[index - 1] = "";
          setOtp(updatedOtp);
        }
      } else {
        // Just clear current input
        const updatedOtp = [...otp];
        updatedOtp[index] = "";
        setOtp(updatedOtp);
      }
    }
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text");
    if (!/^\d+$/.test(pasted)) return; // only digits

    const digits = pasted.slice(0, otp.length).split("");
    const updatedOtp = [...otp];
    digits.forEach((digit, idx) => {
      updatedOtp[idx] = digit;
    });
    setOtp(updatedOtp);

    // Focus last filled box
    const nextIndex =
      digits.length >= otp.length ? otp.length - 1 : digits.length;
    document.getElementById(`otp-${nextIndex}`)?.focus();
  };

  const handleVerifyOTP = async () => {
    const enteredOtp = otp.join("");
    if (!enteredOtp) {
      toast.error("Please enter the OTP.");
      return;
    }
    setLoading(true);
    try {
      const response = await apiRequest({
        url: "/verify-otp",
        method: "post",
        data: {
          user_id: userId,
          otp: enteredOtp,
          type: otpType,
        },
      });

      if (response.success) {
        toast.success("OTP Verified Successfully!");
        if (otpType === "forgot_password") {
          navigate(`/reset-password?type=forgot_password&contact=${contact}`);
        } else {
          localStorage.setItem("auth_token", response.data.token);
          localStorage.setItem("login_time", new Date().getTime());
          navigate("/dashboard");
        }
      } else {
        toast.error(response.message || "OTP verification failed.");
      }
    } catch (error) {
      alert(error.response?.data?.error || "OTP verification failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async (contactType) => {
    setResending(true);
    try {
      const response = await apiRequest({
        url: "/resend-otp",
        method: "post",
        data: {
          user_id: userId,
          contact_type: contactType,
        },
      });
      if (response.success) {
        toast.success("OTP resent successfully!");
      } else {
        toast.error(response.message || "Error resending OTP.");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Error resending OTP.");
    } finally {
      setResending(false);
    }
  };

  return (
    // <div className="flex items-center justify-center min-h-screen">
    <div className="flex items-center justify-center w-full min-h-screen px-4 py-10 sm:px-6 lg:px-8">
      {/* <div className="w-full max-w-md p-8 rounded-3xl border border-gray-400"> */}
      <div className="w-full max-w-md p-12 rounded-3xl border border-gray-400 min-h-[500px] flex flex-col justify-center">
        {/* <div className="p-8 rounded-3xl shadow-md w-96 border"> */}
        {/* Phone icon */}
        <div className="flex mb-4">
          {contact.includes("@") ? (
            <MdEmail className="text-6xl border p-2 rounded-lg" />
          ) : (
            <FaMobileAlt className="text-6xl border p-2 rounded-lg" />
          )}
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold mb-1">Password reset</h2>
        <p className="text-sm text-gray-500 mb-6">
          We sent a code to{" "}
          <span className="text-black font-semibold">{contact}</span>
        </p>

        {/* OTP boxes */}
        <div className="flex justify-between mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center border border-gray-300 rounded-lg text-xl"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={(e) => handlePaste(e)}
              placeholder="•"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          className="w-full py-2 mb-3 border border-gray-300 rounded-xl font-medium bg-[#222222] text-white cursor-pointer"
          onClick={handleVerifyOTP}
          disabled={loading}
        >
          {/* {loading ? "Verifying..." : "Verify"} */}
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <Loader className="animate-spin" size={18} />
              verifying...
            </div>
          ) : (
            "Verify"
          )}
        </button>

        {/* Resend Options */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Didn’t receive the code?{" "}
          <span
            className="text-black font-medium cursor-pointer hover:underline"
            onClick={() =>
              handleResendOTP(contact.includes("@") ? "email" : "phone")
            }
          >
            {resending ? "Resending..." : "Resend"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default VerifyOTP;
