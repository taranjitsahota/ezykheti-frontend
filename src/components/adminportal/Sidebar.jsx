import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo/Logo.png";
import {
  LayoutDashboard,
  User,
  Tractor,
  Puzzle,
  Map,
  Sprout,
  CalendarCheck,
} from "lucide-react";

const Sidebar = ({ isOpen, sidebarRef, toggleSidebar }) => {
  return (
    <aside
      ref={sidebarRef}
      className={`
    w-28 admin-wrapper bg-[var(--sidebar-bg-color)] border-r border-[var(--border-bg-color)] fixed md:relative z-20 group transform transition-transform duration-300 ease-in-out z-30
   ${isOpen ? "translate-x-0" : "-translate-x-full"}
   transition-transform duration-300 ease-in-out
    w-34
    md:relative z-30 md:translate-x-0 md:w-28 border-r shadow-sm
  `}
    >
      <div className="md:hidden flex justify-end p-4 z-30">
        <button onClick={toggleSidebar}>
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="p-2 flex justify-center">
        {/* Main Logo */}
        <img
          src={logo}
          alt="EzyKheti Logo"
          className="h-14 transition-all duration-300 ease-in-out group-hover:block"
        />
      </div>
      <div className="p-2">
        <nav className="mt-4 space-y-2">
          {[
            { to: "/dashboard", icon: <LayoutDashboard />, label: "Dashboard" },
            { to: "/admins", icon: <User />, label: "Admins" },
            { to: "/vehicles", icon: <Tractor />, label: "Vehicles" },
            {
              to: "/attachments",
              icon: <Puzzle />,
              label: "Attachment",
            },
            { to: "/areas", icon: <Map />, label: "Areas" },
            { to: "/crops", icon: <Sprout />, label: "Crops" },
            {
              to: "/assign-bookings",
              icon: <CalendarCheck />,
              label: "Assign Bookings",
            },
          ].map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `relative block py-2 group/nav overflow-hidden text-center transition-colors duration-300 ${
                  isActive ? "bg-[var(--primary-color)] text-white" : ""
                }`
              }
            >
              <div className="absolute bottom-0 left-0 w-full h-0 bg-[var(--primary-color)] text-white transition-all duration-600 ease-in-out group-hover/nav:h-full text-white z-0"></div>

              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="text-[var(--warning-color)] text-2xl group-hover/nav:text-">
                  {icon}
                </div>
                <span className="mt-1 text-xs font-medium group-hover/nav:text-white">
                  {label}
                </span>
              </div>
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
