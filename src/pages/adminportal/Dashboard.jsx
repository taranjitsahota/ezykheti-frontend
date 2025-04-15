import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Remove token
    navigate("/admin"); // Redirect to login page
  };

  return (
    <DashboardLayout>
    {/* <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
      <p className="text-gray-600">You are successfully logged in!</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div> */}
     <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <h2 className="text-2xl font-semibold">201</h2>
          <span className="text-orange-500 text-sm">▲ 25%</span>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-sm text-gray-500">Total Subscription</p>
          <h2 className="text-2xl font-semibold">105,206</h2>
          <span className="text-orange-500 text-sm">▲ 50%</span>
        </div>
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-sm text-gray-500">Total Revenue (YTD, MTD)</p>
          <h2 className="text-2xl font-semibold">1,250,002</h2>
          <span className="text-orange-500 text-sm">▲ 25%</span>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
