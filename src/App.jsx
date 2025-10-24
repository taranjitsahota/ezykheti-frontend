import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/website/Home";
import Registration from "./pages/website/Registration";
import About from "./pages/website/About";
import Pricing from "./pages/website/Pricing";
import PrivacyPolicy from "./pages/website/PrivacyPolicy";
import RefundPolicy from "./pages/website/RefundPolicy";
import ComingSoonNotice from "./components/ComingSoonNotice";
import TermsAndConditions from "./pages/website/TermsAndConditions";

import Admins from "./pages/adminportal/admins";
import Areas from "./pages/adminportal/Areas";
import Substations from "./pages/adminportal/Substations";
import AssignBookings from "./pages/adminportal/AssignBookings";
import Subscriptions from "./pages/adminportal/Subscriptions";
import BusinessTimings from "./pages/adminportal/BusinessTimings";
import Crops from "./pages/adminportal/Crops";
import Dashboard from "./pages/adminportal/Dashboard";
import Drivers from "./pages/adminportal/Drivers";
import Partners from "./pages/adminportal/Partners";
import ForgotPassword from "./pages/adminportal/ForgotPassword";
import InterestedDashboard from "./pages/adminportal/InterestedDashboard";
import InterestedDashboardEmail from "./pages/adminportal/InterestedDashboardEmail";
import Login from "./pages/adminportal/Login";
import Bookings from "./pages/adminportal/Bookings";
import Profile from "./pages/adminportal/Profile";
import Equipment from "./pages/adminportal/Equipment";
import EquipmentType from "./pages/adminportal/EquipmentType";
import EquipmentUnit from "./pages/adminportal/EquipmentUnits";
import EquipmentUnavailability from "./pages/adminportal/EquipmentUnavailablity";
import Register from "./pages/adminportal/Register";
import ResetPassword from "./pages/adminportal/ResetPassword";
import SendOTP from "./pages/adminportal/SendOtp";
import Services from "./pages/adminportal/Services";
import Farmers from "./pages/adminportal/Farmers";
import VerifyOTP from "./pages/adminportal/VerifyOtp";
import DriverUnavailability from "./pages/adminportal/DriverUnavailability";
import PartnerUnavailability from "./pages/adminportal/PartnerUnavailability";
import PartnerAreaCoverge from "./pages/adminportal/PartnerAreaCoverage";
import Tractors from "./pages/adminportal/Tractors";
import TractorUnavailability from "./pages/adminportal/TractorUnavailability";

import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import Service from "./pages/website/Service";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  // useEffect(() => {
  //   const savedLanguage = localStorage.getItem("language") || "en"; // Default to "en" if null
  //   i18n.changeLanguage(savedLanguage);
  // }, []); // Removed `i18n` from dependency to prevent unnecessary re-renders

  // useEffect(() => {
  //   const checkAutoLogout = () => {
  //     const loginTime = localStorage.getItem("login_time");
  //     if(!loginTime){
  //       localStorage.clear();
  //       navigate("/admin");
  //     }
  //     if (loginTime) {
  //       const elapsedTime = new Date().getTime() - parseInt(loginTime);
  //       if (elapsedTime > 30 * 60 * 1000) {
  //         // 30 minutes
  //         localStorage.clear();
  //         navigate("/admin");
  //       }
  //     }
  //   };

  //   const interval = setInterval(checkAutoLogout, 60000); // Check every 1 minute

  //   return () => clearInterval(interval); // Cleanup on unmount
  // }, [navigate]);

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
  const showHeaderFooterRoutes = [
    "/",
    "/registration",
    "/service",
    "/about",
    "/pricing",
    "/privacy-policy",
    "/refund-policy",
  ];

  const protectedRoutes = [
    { path: "/admins", element: <Admins /> },
    { path: "/equipments", element: <Equipment /> },
    { path: "/equipment-type", element: <EquipmentType /> },
    { path: "/equipment-unit", element: <EquipmentUnit /> },
    { path: "/equipment-unavailability", element: <EquipmentUnavailability /> },
    { path: "/areas", element: <Areas /> },
    { path: "/substations", element: <Substations /> },
    { path: "/assign-bookings", element: <AssignBookings /> },
    { path: "/subscriptions", element: <Subscriptions /> },
    { path: "/business-timings", element: <BusinessTimings /> },
    { path: "/crops", element: <Crops /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/drivers", element: <Drivers /> },
    { path: "/partners", element: <Partners /> },
    { path: "/interested-users", element: <InterestedDashboard /> },
    { path: "/interested-users-email", element: <InterestedDashboardEmail /> },
    { path: "/bookings", element: <Bookings /> },
    { path: "/services", element: <Services /> },
    { path: "/farmers", element: <Farmers /> },
    { path: "/profile", element: <Profile /> },
    { path: "/partner-unavailability", element: <PartnerUnavailability /> },
    { path: "/driver-unavailability", element: <DriverUnavailability /> },
    { path: "/partner-area-coverage", element: <PartnerAreaCoverge /> },
    { path: "/tractors", element: <Tractors /> },
    { path: "/tractor-unavailability", element: <TractorUnavailability /> },
  ];

  const showHeaderFooter = showHeaderFooterRoutes.includes(location.pathname);
  const isProtected = protectedRoutes.some((r) => r.path === location.pathname);

  return (
    <>
      <ToastContainer />
      {!isProtected && <ComingSoonNotice />}

      <Suspense fallback={<div>Loading...</div>}>
        {showHeaderFooter && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/service" element={<Service />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/admin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/send-otp" element={<SendOTP />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          {protectedRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute>{element}</ProtectedRoute>}
            />
          ))}
        </Routes>
        {showHeaderFooter && <Footer />}
      </Suspense>
    </>
  );
}

export default App;
