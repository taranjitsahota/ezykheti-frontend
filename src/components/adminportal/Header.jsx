// components/Header.jsx
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


const Header = () => {

const navigate = useNavigate();


    const handleLogout = () => {
        localStorage.clear(); // Remove token
        navigate("/admin"); // Redirect to login page
      };

  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
      {/* Search Bar */}
      <div className="flex items-center space-x-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Search here..."
          className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>

      {/* Notification + Profile */}
      <div className="flex items-center space-x-6">
        <button className="relative">
          <FaBell className="text-gray-600 text-xl" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="flex items-center space-x-2">
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
          <button
        onClick={handleLogout}
        className="mt-6 bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-700"
      >
        Logout
      </button>
            <p className="text-sm font-medium text-gray-700">Jessica</p>
            <p className="text-xs text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
