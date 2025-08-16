import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import { ArrowUp } from "lucide-react";
import { toast } from "react-toastify";
import { apiRequest } from "../../utils/apiService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // const locations = [
  //   { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
  //   { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
  //   { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
  //   { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
  //   { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
  //   { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
  //   { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
  //   { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
  //   { name: "Ambala", imageUrl: "https://placehold.co/100x60/EEE/31343C" },
  // ];
  const navigate = useNavigate();

  const [bookings, setBookings] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [drivers, setDrivers] = useState(null);
  const [farmers, setFarmers] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  const [bookingTrendData, setBookingTrendData] = useState([]);

  const fallback = (value) =>
    value === null || value === undefined ? "-" : value;

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

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
      fetchDashboardMetrics();
    }
  }, []);

  const dummyBookingTrendData = [
  { date: "2025-01", count: 20 },
  { date: "2025-02", count: 35 },
  { date: "2025-03", count: 45 },
  { date: "2025-04", count: 32 },
  { date: "2025-05", count: 50 },
  { date: "2025-06", count: 28 },
];


  const fetchBookingsTrend = async () => {
    try {
      const res = await apiRequest({
        url: "/bookings-trend?range=monthly", // or 'daily'
        method: "get",
      });

      if (res && Array.isArray(res)) {
        setBookingTrendData(res);
      } else {
        toast.error("Failed to fetch booking trend data");
         setBookingTrendData(dummyBookingTrendData);
      }
    } catch (err) {
      toast.error("Error loading booking trend");
       setBookingTrendData(dummyBookingTrendData);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      navigate("/admin");
    } else {
      setIsAuthenticated(true);
      fetchDashboardMetrics();
      fetchBookingsTrend(); // add this
    }
  }, []);

  const fetchDashboardMetrics = async () => {
    setLoading(true);
    try {
      const res = await apiRequest({
        url: "/dashboard-metrics",
        method: "get",
      });

      if (res.success) {
        const {
          bookings,
          subscriptions,
          revenue,
          drivers,
          farmers,
          locations,
        } = res.data;

        setBookings(bookings);
        setSubscriptions(subscriptions);
        setRevenue(revenue);
        setDrivers(drivers);
        setFarmers(farmers);
        setLocations(Array.isArray(locations) ? locations : []);
      } else {
        toast.error(res.message || "Failed to fetch metrics.");
      }
    } catch (err) {
      toast.error("Error loading dashboard metrics");
    } finally {
      setLoading(false);
    }
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
            <h2 className="text-2xl font-semibold mt-2">
              <h2>{fallback(bookings)}</h2>
            </h2>

            <PercentageIncrease percentage={25} />
          </div>

          {/* Small Box 2 */}
          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-sm text-gray-500">Total Subscription</p>
            <h2 className="text-2xl font-semibold mt-2">{fallback(subscriptions)}</h2>
            <PercentageIncrease percentage={50} />
          </div>

          {/* Small Box 3 */}
          <div className="bg-white rounded-xl p-6 shadow">
            <p className="text-sm text-gray-500">Total Revenue (YTD, MTD)</p>
            <h2 className="text-2xl font-semibold mt-2">
              <h2>{fallback(subscriptions)}</h2>
            </h2>
            <PercentageIncrease percentage={25} />
          </div>

          {/* Two small boxes stacked vertically */}
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Bottom Left Box */}
            <div className="bg-white rounded-xl p-6 shadow">
              <p className="text-sm text-gray-500">Total Drivers</p>
              <h2 className="text-2xl font-semibold mt-2">
                <h2>{fallback(drivers)}</h2>
              </h2>
            </div>

            {/* Bottom Middle Box */}
            <div className="bg-white rounded-xl p-6 shadow">
              <p className="text-sm text-gray-500">Total Registered Farmers</p>
              <h2 className="text-2xl font-semibold mt-2">
                <h2>{fallback(farmers)}</h2>
              </h2>
            </div>
          </div>
        </div>

      

        {/* Right Side - Tall Box */}
        <div className="bg-white rounded-xl p-6 shadow md:row-span-2 flex flex-col">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Top revenue generating locations
          </h2>
          <div className="space-y-2 overflow-y-auto">
            {locations.length > 0 ? (
              locations.map((location, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-gray-100 rounded-lg p-2"
                >
                  <img
                    src={location.imageUrl}
                    alt={location.name}
                    className="w-16 h-10 object-cover rounded-md"
                  />
                  <span className="text-gray-700 font-medium">
                    {location.name}
                  </span>
                </div>
              ))
            ) : (
              <p>No locations found.</p>
            )}
          </div>
        </div>
      </div>
        <div className="md:col-span-4">
          <div className="mt-10 bg-white p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Monthly Booking Trends
            </h2>
            {bookingTrendData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={bookingTrendData}>
                  <XAxis dataKey="date" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#82ca9d"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <p>No booking trend data available.</p>
            )}
          </div>
        </div>
    </DashboardLayout>
  );
};

export default Dashboard;
