import { Routes, Route, useLocation  } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/adminportal/Login";
import Home from "./pages/website/Home";
import Registration from "./pages/website/Registration";
import About from "./pages/website/About";
import Pricing from "./pages/website/Pricing";
import Register from "./pages/adminportal/Register";
import ForgotPassword from "./pages/adminportal/ForgotPassword";
import SendOTP from "./pages/adminportal/SendOtp";
import VerifyOTP from "./pages/adminportal/VerifyOtp";
import ResetPassword from "./pages/adminportal/ResetPassword";
import Dashboard from "./pages/adminportal/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect,Suspense  } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import Service from "./pages/website/Service";
import { useTranslation } from "react-i18next"; 

function App() {

  const { t,i18n  } = useTranslation();
  
  const navigate = useNavigate();

  
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en"; // Default to "en" if null
    i18n.changeLanguage(savedLanguage);
  }, []); // Removed `i18n` from dependency to prevent unnecessary re-renders
  

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
     <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </>
  );
}

export default App;
