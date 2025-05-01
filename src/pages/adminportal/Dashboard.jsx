import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ArrowUp } from "lucide-react";

const Dashboard = () => {
  const locations = [
    { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" }, // Replace with actual image URLs
    { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
    { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
    { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
    { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
    { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
    { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
    { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
    { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
  ];

  const PercentageIncrease = ({ percentage = 25, className }) => {
    const roundedPercentage = Math.round(percentage);

    return (
      <div
        className={`flex mt-2 bg-[var(--warning-color)] p-1 rounded-full w-14 items-center gap-1 ${className}`}
      >
        <ArrowUp className="w-3 h-3  text-white" />
        <span className="text-sm font-medium text-white">
          {roundedPercentage}%
        </span>
      </div>
    );
  };

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
    <DashboardLayout pageTitle="Dashboard" showAddButton={false}>
    {/* Main Grid */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* Left Side - 3 Small Boxes */}
      <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Small Box 1 */}
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-sm text-gray-500">Total Bookings</p>
          <h2 className="text-2xl font-semibold mt-2">201</h2>
          <PercentageIncrease percentage={25} />
        </div>
  
        {/* Small Box 2 */}
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-sm text-gray-500">Total Subscription</p>
          <h2 className="text-2xl font-semibold mt-2">105,206</h2>
          <PercentageIncrease percentage={50} />
        </div>
  
        {/* Small Box 3 */}
        <div className="bg-white rounded-xl p-6 shadow">
          <p className="text-sm text-gray-500">Total Revenue (YTD, MTD)</p>
          <h2 className="text-2xl font-semibold mt-2">1,250,002</h2>
          <PercentageIncrease percentage={25} />
        </div>
  
        {/* Two small boxes stacked vertically */}
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Bottom Left Box */}
          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-sm text-gray-500">Total Drivers</p>
            <h2 className="text-2xl font-semibold mt-2">200</h2>
          </div>
  
          {/* Bottom Middle Box */}
          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-sm text-gray-500">Total Registered Farmers</p>
            <h2 className="text-2xl font-semibold mt-2">1500</h2>
          </div>
        </div>
      </div>
  
      {/* Right Side - Tall Box */}
      <div className="bg-white rounded-xl p-6 shadow md:row-span-2 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Top revenue generating locations
        </h2>
        <div className="space-y-2 overflow-y-auto">
          {locations.map((location, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-gray-100 rounded-lg p-2"
            >
              <img
                src={location.imageUrl}
                alt={location.name}
                className="w-16 h-10 object-cover rounded-md"
              />
              <span className="text-gray-700 font-medium">{location.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </DashboardLayout>
  
  
  );
};

export default Dashboard;
