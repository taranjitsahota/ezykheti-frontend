import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/images/logo/ezykheti_logo.png";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/apiService";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Password must be of min 8 characters")
      .required("Required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await apiRequest({
        url: "/login",
        method: "post",
        data: values,
      });

      if (response.success) {
        toast.success(response.message || "Login successful!");

        if (response.data?.otp) {
          localStorage.setItem("user_id", response.data.user_id);
          navigate("/verify-otp");
        } else {
          localStorage.setItem("auth_token", response.data.token);
          localStorage.setItem("login_time", new Date().getTime());
          localStorage.setItem("user_role", response.data.role || "user");
          navigate("/dashboard");
        }
      } else {
        setErrorMessage(response.message);
        toast.error(response.message || "Login failed");
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "Something went wrong. Please try again.";

      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="flex flex-col md:flex-row rounded-4xl border border-gray-300 w-full max-w-3xl md:h-[520px]">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block relative">
          <img
            src="/image_processing20210907-11486-1q4ab3u.gif"
            alt="Placeholder"
            className="w-full h-full object-cover rounded-l-4xl"
            onError={(e) => (e.target.src = "/fallback-image.gif")}
          />
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
            <img src={logo} alt="Logo" className="w-32 h-auto object-contain" />
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-3xl text-[#222222] font-bold">Welcome Back</h2>
            <p className="text-sm text-[#222222] mt-1">
              Sign in to access your dashboard
            </p>
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="mt-10">
                {/* Email Field */}
                <div>
                  <label className="block font-medium mb-1 text-[#222222]">
                    Email
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
                    <Mail className="text-gray-400 mr-2" size={20} />
                    <Field
                      name="email"
                      type="email"
                      placeholder="Info@gmail.com"
                      className="w-full outline-none bg-transparent text-black"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                {/* Password Field */}
                <div className="mt-4">
                  <label className="block font-medium mb-1 text-[#222222]">
                    Password
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-xl px-3 py-2">
                    <Lock className="text-gray-400 mr-2" size={20} />
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      className="w-full outline-none bg-transparent text-black placeholder-gray-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="focus:outline-none ml-2 cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff size={20} className="text-gray-600" />
                      ) : (
                        <Eye size={20} className="text-gray-600" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-blue-500 text-sm mt-1 cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full mt-6 px-3 py-2 bg-[#222222] text-white text-white rounded cursor-pointer"
                  disabled={isSubmitting || loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader className="animate-spin" size={18} />
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>

                {/* Error Message */}
                {errorMessage && (
                  <div className="text-red-500 text-sm mt-2">
                    {errorMessage}
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
