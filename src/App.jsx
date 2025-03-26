import { Routes, Route, useLocation  } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import About from "./pages/About";
import Services from "./pages/Service";
import Pricing from "./pages/Pricing";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import SendOTP from "./pages/SendOtp";
import VerifyOTP from "./pages/VerifyOtp";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import Service from "./pages/Service";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAutoLogout = () => {
      const loginTime = localStorage.getItem("login_time");
      if (loginTime) {
        const elapsedTime = new Date().getTime() - parseInt(loginTime);
        if (elapsedTime > 30 * 60 * 1000) {
          // 30 minutes
          localStorage.clear();
          navigate("/");
        }
      }
    };

    const interval = setInterval(checkAutoLogout, 60000); // Check every 1 minute

    return () => clearInterval(interval); // Cleanup on unmount
  }, [navigate]);

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  const location = useLocation();

  // Define routes where Navbar and Footer should be visible
  const showHeaderFooterRoutes = ["/", "/registration", "/services", "/about", "/pricing"];

  const showHeaderFooter = showHeaderFooterRoutes.includes(location.pathname);

  return (
    <>
       {showHeaderFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/services" element={<Service />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/send-otp" element={<SendOTP />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      {showHeaderFooter && <Footer />}
    </>
  );
}

export default App;
