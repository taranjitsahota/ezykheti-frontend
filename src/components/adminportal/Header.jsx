import { Bell, Search, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";
import Modal from "./Modal";
import { apiRequest } from "../../utils/apiService";
import { toast } from "react-toastify";

const Header = ({ toggleSidebar }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const fields = [
    { name: "oldPassword", label: "Old Password", type: "password" },
    { name: "newPassword", label: "New Password", type: "password" },
    { name: "confirmPassword", label: "Confirm Password", type: "password" },
  ];

   const [profilePhoto, setProfilePhoto] = useState(localStorage.getItem("profile_photo"));


   useEffect(() => {
    const interval = setInterval(() => {
      const latestPhoto = localStorage.getItem("profile_photo");
      if (latestPhoto !== profilePhoto) {
        setProfilePhoto(latestPhoto);
      }
    }, 1000); // check every second

    return () => clearInterval(interval);
  }, [profilePhoto]);

  const handleSubmit = async (data) => {
    const { oldPassword, newPassword, confirmPassword } = data;
    const user_id = localStorage.getItem("user_id");

    // 🔐 Basic validations
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    try {
      const response = await apiRequest({
        url: "/change-password", // your backend route
        method: "POST",
        data: {
          type: "change_password",
          user_id,
          old_password: oldPassword,
          new_password: newPassword,
          new_password_confirmation: confirmPassword, // Laravel's `confirmed` rule will expect this
        },
      });

      if (response.success) {
        toast.success("Password changed successfully! Please log in again.");
        localStorage.clear();
        navigate("/admin");
        setIsModalOpen(false);
      } else {
        toast.error(response.message || "Failed to change password.");
      }
    } catch (err) {
      toast.error("Something went wrong while changing password.");
    }
  };

  const username = localStorage.getItem("username");
  // const profilePhoto = localStorage.getItem("profile_photo");

  const navigate = useNavigate();

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const dropdownRef = useRef(null);

  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await apiRequest({
        url: "/logout",
        method: "post",
      });

      if (res.success) {
        localStorage.clear();
        navigate("/admin");
      } else {
        toast.error(res.message || "Failed to logout.");
      }
    } catch (err) {
      toast.error("Error logging out.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Step 1: Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query as user types
  };

  // Step 2: Filter page content by search query
  useEffect(() => {
    const contentElements = document.querySelectorAll(".content-item"); // Add class to target content
    contentElements.forEach((element) => {
      const text = element.textContent || element.innerText;
      if (text.toLowerCase().includes(searchQuery.toLowerCase())) {
        element.style.display = "block"; // Show element if it matches search query
      } else {
        element.style.display = "none"; // Hide element if it doesn't match
      }
    });
  }, [searchQuery]); // Re-run this effect when searchQuery changes

  return (
    <header className="admin-wrapper bg-[var(--sidebar-bg-color)] flex items-center justify-between px-6 py-2 border border-[var(--border-bg-color)] sticky top-0 z-30">
      <button
        onClick={toggleSidebar}
        data-sidebar-toggle
        className="text-green-600 focus:outline-none md:hidden"
      >
        ☰
      </button>

      {/* Left Section */}
      <div className="flex items-center">
        {/* Search Bar */}
        <div className="flex hidden md:flex items-center w-full max-w-xs relative mr-4">
          <Search className="absolute left-2 text-yellow-500 text-xs" />
          <input
            type="text"
            placeholder="Search here..."
            value={searchQuery} // Bind input value to searchQuery
            onChange={handleSearchChange} // Update search query on input change
            className="w-full pl-10 pr-30 py-1.5 text-sm rounded-full border border-gray-300
                    focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-6 relative">
        <div className="hidden md:flex items-center space-x-4">
          <div className="rounded-full bg-gray-100 p-2">
            <Settings className="h-6 w-6 text-[var(--warning-color)]" />
          </div>
          {/* Notification Bell */}
          <button className="rounded-full border border-gray-300 text-gray-800 py-2 px-4 flex items-center space-x-2">
            <span className="text-lg font-medium text-gray-800">
              Notification
            </span>
            <div className="relative">
              <Bell className="h-6 w-6 text-[var(--warning-color)]" />
              {/* Red dot on the bell icon */}
              <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
          </button>
        </div>

        {/* Profile Section */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            ref={dropdownRef}
            onClick={handleProfileClick}
          >
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                <User className="w-6 h-6 text-gray-700" />
              </div>
            )}
            <div className="text-left">
              <div className="text-left">
                <p className="text-sm font-medium text-gray-700">Hello,</p>
                <p className="text-lg font-medium text-gray-700">
                  {username || "Guest"}
                </p>
              </div>
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-14 right-0 bg-white rounded-lg shadow-lg w-48 z-20">
              <Link to="/profile">
                <button className="block w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer">
                  View profile
                </button>
              </Link>
              <button
                onClick={() => setIsModalOpen(true)}
                className="block w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                Change password
              </button>

              {/* <button className="block w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100">
                Users
              </button> */}
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className={`block w-full text-left px-4 rounded-b-lg text-white bg-[var(--warning-color)] cursor-pointer mt-2 flex items-center justify-between ${
                  isLoggingOut ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoggingOut ? "Logging out..." : "LogOut"}
                {!isLoggingOut && <LogOut size={16} />}
              </button>
            </div>
          )}
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Change Password"
            fields={fields}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
