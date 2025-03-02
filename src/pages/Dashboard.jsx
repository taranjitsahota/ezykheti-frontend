import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

   useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            navigate("/login"); // Redirect to login if not authenticated
        } else {
            setIsAuthenticated(true);
        }
    }, []);

  const handleLogout = () => {
    localStorage.clear(); // Remove token
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Dashboard</h1>
      <p className="text-gray-600">You are successfully logged in!</p>
      <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
