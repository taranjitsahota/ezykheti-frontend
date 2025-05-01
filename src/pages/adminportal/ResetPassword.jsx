import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Loader } from "lucide-react";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";
import AuthLayout from "../../layouts/AuthLayout";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const contact = queryParams.get("contact");

  const storedUserId = localStorage.getItem("user_id");

  const handleResetPassword = async () => {
    if (!storedUserId) {
      toast.error("User ID not found. Please try again.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiRequest({
        url: "/change-password",
        method: "post",
        data: {
          user_id: storedUserId,
          type: "forgot_password",
          new_password: password,
          new_password_confirmation: confirmPassword,
        },
      });

      if (response.success) {
        toast.success("Password reset successful.");
        navigate("/admin");
      } else {
        toast.error(response.message || "Password reset failed.");
      }
    } catch (error) {
      toast.error(error.message || "Password reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title={
        <>
          <div className="flex justify-center items-center">
            <div className="p-4 rounded-full">
              <Lock className="w-6 h-6 text-[#417505]" />
            </div>
          </div>
          Set new password
        </>
      }
      subtitle={
        <>
          {" "}
          Must be at least <span className="font-semibold">8 characters</span>.
        </>
      }
    >
      <div className="mb-4 relative mt-6">
        <label className="block text-md font-semibold font-medium text-[#222222] mb-1">
          Password
        </label>
        <div className="input-wrapper flex items-center border rounded-xl px-3 py-2">
          <Lock className="w-4 h-4 text-[#222222] mr-2" />
          <input
            type={showPassword ? "text" : "password"}
            className="w-full outline-none"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-[#222222]"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Strength Bars */}
      <div className="flex gap-2 mt-2 mb-6 px-1">
        {Array.from({ length: 4 }, (_, i) => {
          const length = password.length;
          const filled = Math.min(4, Math.floor(length / 2));
          const barColor = i < filled ? "bg-[#417505]" : "bg-gray-300";
          return (
            <div
              key={i}
              className={`h-2 rounded-full flex-1 transition-all duration-300 ${barColor}`}
            />
          );
        })}
      </div>

      <div className="mb-6 relative">
        <div className="input-wrapper flex items-center border rounded-xl px-3 py-2">
          <Lock className="w-4 h-4 text-[#222222] mr-2" />
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="w-full outline-none"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="text-[#222222]"
          >
            {showConfirmPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <button
        onClick={handleResetPassword}
        disabled={loading}
        className="btn-submit w-full cursor-pointer py-2 rounded-md font-semibold"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader className="animate-spin" size={18} />
            Resetting...
          </div>
        ) : (
          "Reset"
        )}
      </button>
    </AuthLayout>
  );
};

export default ResetPassword;
