import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config/api";

const Login = () => {
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
    <div className="flex items-center justify-center h-screen bg-gray-100">
      {/* <div className="w-206 p-6 bg-white rounded-lg shadow-md"> */}
      <div className="flex bg-white rounded-lg shadow-md w-full max-w-2xl">
        {/* Left Side - Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="/image_processing20210907-11486-1q4ab3u.gif"
            alt="Placeholder"
            className="w-full h-full object-cover rounded-l-lg"
            onError={(e) => (e.target.src = "/fallback-image.gif")}
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={loginSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="mt-4">
                <div>
                  <label className="block font-medium">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="mt-3">
                  <label className="block font-medium">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="w-full px-3 py-2 border rounded"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 px-3 py-2 bg-blue-500 text-white rounded"
                  disabled={isSubmitting || loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                {errorMessage && (
                  <div className="text-red-500 text-sm mt-2">
                    {errorMessage}
                  </div>
                )}
              </Form>
            )}
          </Formik>

          <div className="mt-3 text-center">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
