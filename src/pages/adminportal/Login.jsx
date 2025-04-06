import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/api";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

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
      const response = await axios.post(`${API_BASE_URL}/login`, values);
      if (response.data.otp_sent) {
        localStorage.setItem("user_id", response.data.user_id); // Store user_id
        navigate("/verify-otp");
      } else {
        localStorage.setItem("auth_token", response.data.token);
        localStorage.setItem("login_time", new Date().getTime()); // Store login time
        navigate("/dashboard");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.error ||
          "Invalid credentials or error logging in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="flex flex-col md:flex-row rounded-4xl bg-gray-50 border border-gray-300 w-full max-w-3xl md:h-[520px]">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="/image_processing20210907-11486-1q4ab3u.gif"
            alt="Placeholder"
            className="w-full h-full object-cover rounded-l-4xl"
            onError={(e) => (e.target.src = "/fallback-image.gif")}
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-3xl text-gray-800 font-bold">Welcome Back</h2>
            <p className="text-sm text-gray-800 mt-1">
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
              <label className="block font-medium mb-1 text-gray-800">Email</label>
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
              <label className="block font-medium mb-1 text-gray-800">Password</label>
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
              onClick={() => navigate("/forgot-password")}
              className="text-blue-500 text-sm mt-1 cursor-pointer"
            >
              Forgot Password?
            </button>
              
            </div>
          
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-6 px-3 py-2 bg-gray-800 text-white rounded"
              disabled={isSubmitting || loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          
            {/* Error Message */}
            {errorMessage && (
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}
          </Form>
            )}
          </Formik>

          {/* <div className="mt-3 text-center">
            <button
              onClick={() => navigate("/register")}
              className="text-blue-500"
            >
              Register
            </button>
            <span className="mx-2">|</span>
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-blue-500"
            >
              Forgot Password?
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
