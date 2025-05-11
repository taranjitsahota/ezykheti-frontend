import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/images/logo/Logo.png";
import cover from "../../assets/images/login-page-cover.png";
import vector from "../../assets/images/vector.png";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../../utils/apiService";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";
import AuthLayout from "../../layouts/AuthLayout";

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

  const handleLogin = async (values) => {
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
          // navigate(`/verify-otp?contact=${response.data.contact}&type=login`);
          navigate(`/verify-otp?type=login&contact=${response.data.email}`);
        } else {
          localStorage.setItem("auth_token", response.data.token);
          localStorage.setItem("login_time", new Date().getTime());
          localStorage.setItem("user_role", response.data.role || "user");
          localStorage.setItem("username", response.data.name || "Guest");
          localStorage.setItem("user_id", response.data.id);
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
    <AuthLayout>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form className="mt-10 ">
            {/* Email Field */}
            <div>
              <label className="block font-medium mb-1 ">Email</label>
              <div className="input-wrapper flex items-center rounded-xl px-3 py-2">
                <Mail className="text-gray-400 mr-2" size={25} />
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
              <label className="block font-medium mb-1">Password</label>
              <div className="input-wrapper flex items-center rounded-xl px-3 py-2">
                <Lock className="text-gray-400 mr-2" size={25} />
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full outline-none bg-transparent text-black"
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
                className="forgot-link text-sm mt-1 cursor-pointer"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-submit w-full mt-6 px-3 py-2 text-white text-white rounded cursor-pointer"
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
              <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
            )}
          </Form>
        )}
      </Formik>
      <p className="mt-6 text-xs text-gray-400 text-center">
        Your credentials are encrypted and secure.
      </p>
    </AuthLayout>
  );
};

export default Login;
