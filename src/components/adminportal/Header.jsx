import { Bell, Search, Settings, LogOut    } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Header = ({ toggleSidebar }) => {
  const username = localStorage.getItem("username");

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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/admin");
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
            <img
              src="https://i.pravatar.cc/40"
              alt="profile"
              className="w-10 h-10 rounded-full object-cover"
            />
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
              <button className="block w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100">
                Update profile photo
              </button>
              <button className="block w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100">
                Change pin
              </button>
              <button className="block w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100">
                Users
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 rounded-b-lg text-white bg-[var(--warning-color)] cursor-pointer mt-2 flex items-center justify-between"
              >
                LogOut
                <LogOut    size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
