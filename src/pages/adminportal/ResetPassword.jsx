import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Loader } from "lucide-react";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";


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
        url: '/change-password',
        method: 'post',
        data: {
          user_id: storedUserId,
          type: 'forgot_password',
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
    <div className="flex items-center justify-center h-screen ">
      <div className="w-full max-w-md rounded-2xl border border-gray-400 p-8">
        <div className="flex justify-center mb-2">
          <div className="p-4 rounded-full">
            <Lock className="w-6 h-6 text-[#222222]" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-center text-[#222222]">Set new password</h2>
        <p className="text-sm text-center text-[#222222] mb-6">
          Must be at least <span className="font-semibold">8 characters</span>.
        </p>

        <div className="mb-4 relative">
          <label className="block text-md font-semibold font-medium text-[#222222] mb-1">Password</label>
          <div className="flex items-center border rounded-xl px-3 py-2">
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
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="mb-6 relative">
          <div className="flex items-center border rounded-xl px-3 py-2">
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
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          onClick={handleResetPassword}
          disabled={loading}
          className="w-full bg-[#222222] cursor-pointer text-white py-2 rounded-md font-semibold"
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

       
      </div>
    </div>
  );
};

export default ResetPassword;
