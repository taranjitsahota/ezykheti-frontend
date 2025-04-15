// components/Sidebar.jsx
import { NavLink } from "react-router-dom";
import { FaUser, FaTractor, FaPuzzlePiece, FaMapMarkedAlt, FaSeedling } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white border-r shadow-sm">
      <div className="p-4 text-2xl font-bold text-green-700">🌾 EzyKheti</div>
      <nav className="mt-6 space-y-2">
        <NavLink to="/dashboard" className="block px-6 py-2 hover:bg-green-100">📊 Dashboard</NavLink>
        <NavLink to="/users" className="block px-6 py-2 hover:bg-green-100"><FaUser className="inline mr-2" />Manage User</NavLink>
        <NavLink to="/vehicles" className="block px-6 py-2 hover:bg-green-100"><FaTractor className="inline mr-2" />Manage Vehicles</NavLink>
        <NavLink to="/attachments" className="block px-6 py-2 hover:bg-green-100"><FaPuzzlePiece className="inline mr-2" />Manage Attachment</NavLink>
        <NavLink to="/areas" className="block px-6 py-2 hover:bg-green-100"><FaMapMarkedAlt className="inline mr-2" />Manage Areas</NavLink>
        <NavLink to="/crops" className="block px-6 py-2 hover:bg-green-100"><FaSeedling className="inline mr-2" />Manage Crops</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
